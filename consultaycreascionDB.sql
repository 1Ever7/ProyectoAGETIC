-- Tabla de Usuarios para autenticación
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL CHECK (rol IN ('admin', 'juez', 'visor')),
    activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Tutores
CREATE TABLE tutores (
    id SERIAL PRIMARY KEY,
    documento_identidad VARCHAR(50) NOT NULL UNIQUE,
    nombre_completo VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Competencias
CREATE TABLE competencias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_inicio TIMESTAMP,
    fecha_fin TIMESTAMP,
    numero_clasificados INTEGER DEFAULT 3,
    estado VARCHAR(50) DEFAULT 'configuracion' CHECK (estado IN ('configuracion', 'en_progreso', 'finalizada')),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Pistas
CREATE TABLE pistas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    estado VARCHAR(50) DEFAULT 'disponible' CHECK (estado IN ('disponible', 'en_uso', 'mantenimiento')),
    competencia_id INTEGER REFERENCES competencias(id) ON DELETE CASCADE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Participantes
CREATE TABLE participantes (
    id SERIAL PRIMARY KEY,
    nombre_equipo VARCHAR(255) NOT NULL UNIQUE,
    departamento VARCHAR(100) NOT NULL,
    provincia VARCHAR(100) NOT NULL,
    municipio VARCHAR(100) NOT NULL,
    documento_identidad VARCHAR(50) NOT NULL UNIQUE,
    nombre_completo VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    rol VARCHAR(50) NOT NULL CHECK (rol = 'participante' OR rol = 'tutor'),
    tutor_id INTEGER REFERENCES tutores(id) ON DELETE SET NULL,
    competencia_id INTEGER REFERENCES competencias(id) ON DELETE CASCADE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Equipos (Rojo/Azul)
CREATE TABLE equipos (
    id SERIAL PRIMARY KEY,
    color VARCHAR(50) NOT NULL CHECK (color IN ('rojo', 'azul')),
    ronda_id INTEGER REFERENCES rondas(id) ON DELETE CASCADE,
	creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Miembros de Equipo (relación muchos a muchos entre participantes y equipos)
CREATE TABLE miembros_equipo (
    id SERIAL PRIMARY KEY,
    participante_id INTEGER REFERENCES participantes(id) ON DELETE CASCADE,
    equipo_id INTEGER REFERENCES equipos(id) ON DELETE CASCADE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(participante_id, equipo_id)
);

-- Tabla de Rondas
CREATE TABLE rondas (
    id SERIAL PRIMARY KEY,
    numero_ronda INTEGER NOT NULL,
    fecha_hora TIMESTAMP,
    estado VARCHAR(50) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'en_progreso', 'finalizada')),
    pista_id INTEGER REFERENCES pistas(id) ON DELETE SET NULL,
    competencia_id INTEGER REFERENCES competencias(id) ON DELETE CASCADE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de relación entre Rondas y Equipos (muchos a muchos)
CREATE TABLE ronda_equipos (
    id SERIAL PRIMARY KEY,
    ronda_id INTEGER REFERENCES rondas(id) ON DELETE CASCADE,
    equipo_id INTEGER REFERENCES equipos(id) ON DELETE CASCADE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(ronda_id, equipo_id)
);

-- Tabla de Puntajes
CREATE TABLE puntajes (
    id SERIAL PRIMARY KEY,
    puntos INTEGER NOT NULL CHECK (puntos >= 0 AND puntos <= 50),
    equipo_id INTEGER REFERENCES equipos(id) ON DELETE CASCADE,
    ronda_id INTEGER REFERENCES rondas(id) ON DELETE CASCADE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(equipo_id, ronda_id)
);

-- Tabla de Clasificados
CREATE TABLE clasificados (
    id SERIAL PRIMARY KEY,
    participante_id INTEGER REFERENCES participantes(id) ON DELETE CASCADE,
    competencia_id INTEGER REFERENCES competencias(id) ON DELETE CASCADE,
    posicion INTEGER NOT NULL,
    puntaje_total INTEGER NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de logs para auditoría
CREATE TABLE logs_sistema (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
    accion VARCHAR(255) NOT NULL,
    tabla_afectada VARCHAR(100),
    registro_id INTEGER,
    detalles JSONB,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_participantes_competencia ON participantes(competencia_id);
CREATE INDEX idx_rondas_competencia ON rondas(competencia_id);
CREATE INDEX idx_puntajes_ronda ON puntajes(ronda_id);
CREATE INDEX idx_puntajes_equipo ON puntajes(equipo_id);
CREATE INDEX idx_clasificados_competencia ON clasificados(competencia_id);




----triggers para auditoria 
CREATE OR REPLACE FUNCTION fn_auditoria_universal()
RETURNS TRIGGER AS $$
DECLARE
    v_usuario_id INTEGER;
    v_detalles JSONB;
BEGIN
    -- Obtener usuario de sesión
    BEGIN
        v_usuario_id := current_setting('app.current_user_id', true)::INTEGER;
    EXCEPTION WHEN OTHERS THEN
        v_usuario_id := NULL;
    END;
    
    -- Construir detalles según operación
    IF TG_OP = 'INSERT' THEN
        v_detalles := jsonb_build_object(
            'nuevo', to_jsonb(NEW),
            'ip', inet_client_addr()
        );
        
    ELSIF TG_OP = 'UPDATE' THEN
        v_detalles := jsonb_build_object(
            'anterior', to_jsonb(OLD),
            'nuevo', to_jsonb(NEW),
            'campos_modificados', (
                SELECT jsonb_object_agg(key, value)
                FROM jsonb_each(to_jsonb(NEW))
                WHERE value IS DISTINCT FROM to_jsonb(OLD)->key
            )
        );
        
    ELSIF TG_OP = 'DELETE' THEN
        v_detalles := jsonb_build_object(
            'anterior', to_jsonb(OLD)
        );
    END IF;
    
    -- Insertar registro de auditoría
    INSERT INTO logs_sistema (
        usuario_id, 
        accion, 
        tabla_afectada, 
        registro_id, 
        detalles
    ) VALUES (
        v_usuario_id,
        CASE TG_OP 
            WHEN 'INSERT' THEN 'CREATE'
            WHEN 'UPDATE' THEN 'UPDATE'
            WHEN 'DELETE' THEN 'DELETE'
        END,
        TG_TABLE_NAME,
        COALESCE(NEW.id, OLD.id),
        v_detalles
    );
    
    RETURN CASE TG_OP 
        WHEN 'DELETE' THEN OLD 
        ELSE NEW 
    END;
END;
$$ LANGUAGE plpgsql;


----Aplicación a Tablas Clave
-- Tablas críticas para auditar
CREATE TRIGGER tr_auditar_participantes
AFTER INSERT OR UPDATE OR DELETE ON participantes
FOR EACH ROW EXECUTE FUNCTION fn_auditoria_universal();

CREATE TRIGGER tr_auditar_puntajes
AFTER INSERT OR UPDATE OR DELETE ON puntajes
FOR EACH ROW EXECUTE FUNCTION fn_auditoria_universal();

CREATE TRIGGER tr_auditar_competencias
AFTER INSERT OR UPDATE OR DELETE ON competencias
FOR EACH ROW EXECUTE FUNCTION fn_auditoria_universal();

CREATE TRIGGER tr_auditar_rondas
AFTER INSERT OR UPDATE OR DELETE ON rondas
FOR EACH ROW EXECUTE FUNCTION fn_auditoria_universal();






CREATE TABLE historial_competencias (
    id SERIAL PRIMARY KEY,
    competencia_id INTEGER REFERENCES competencias(id) ON DELETE CASCADE set null,
    gestion INTEGER NOT NULL,  -- año
    version VARCHAR(50) NOT NULL, -- Ej. "1ra edición"
    categoria VARCHAR(100) NOT NULL, -- Ej. "Junior", "Avanzado"
    nombre VARCHAR(255) NOT NULL, -- Nombre de la competencia
    descripcion TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    total_participantes INTEGER,
    total_rondas INTEGER,
    observaciones TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




