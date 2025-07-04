PGDMP      .                }            compe    16.9    16.9 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16397    compe    DATABASE     z   CREATE DATABASE compe WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Bolivia.1252';
    DROP DATABASE compe;
                postgres    false            �           1247    16864    pistas_estado_enum    TYPE     g   CREATE TYPE public.pistas_estado_enum AS ENUM (
    'disponible',
    'en_uso',
    'mantenimiento'
);
 %   DROP TYPE public.pistas_estado_enum;
       public          postgres    false            �           1247    16851    rondas_estado_enum    TYPE     h   CREATE TYPE public.rondas_estado_enum AS ENUM (
    'pendiente',
    'en_progreso',
    'finalizada'
);
 %   DROP TYPE public.rondas_estado_enum;
       public          postgres    false                        1255    16703    fn_auditoria_universal()    FUNCTION     Z  CREATE FUNCTION public.fn_auditoria_universal() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
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
$$;
 /   DROP FUNCTION public.fn_auditoria_universal();
       public          postgres    false            �            1259    16666    clasificados    TABLE     �   CREATE TABLE public.clasificados (
    id integer NOT NULL,
    posicion integer NOT NULL,
    puntaje_total integer NOT NULL,
    creado_en timestamp without time zone DEFAULT now() NOT NULL,
    "participanteId" integer,
    "competenciaId" integer
);
     DROP TABLE public.clasificados;
       public         heap    postgres    false            �            1259    16665    clasificados_id_seq    SEQUENCE     �   CREATE SEQUENCE public.clasificados_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.clasificados_id_seq;
       public          postgres    false    234            �           0    0    clasificados_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.clasificados_id_seq OWNED BY public.clasificados.id;
          public          postgres    false    233            �            1259    16832    competencia    TABLE     �  CREATE TABLE public.competencia (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    descripcion text,
    fecha_inicio timestamp without time zone,
    fecha_fin timestamp without time zone,
    numero_clasificados integer DEFAULT 3 NOT NULL,
    estado character varying(50) DEFAULT 'configuracion'::character varying NOT NULL,
    creado_en timestamp without time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.competencia;
       public         heap    postgres    false            �            1259    16831    competencia_id_seq    SEQUENCE     �   CREATE SEQUENCE public.competencia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.competencia_id_seq;
       public          postgres    false    244            �           0    0    competencia_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.competencia_id_seq OWNED BY public.competencia.id;
          public          postgres    false    243            �            1259    16517    competencias    TABLE     �  CREATE TABLE public.competencias (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    descripcion text,
    fecha_inicio timestamp without time zone,
    fecha_fin timestamp without time zone,
    numero_clasificados integer DEFAULT 3,
    estado character varying(50) DEFAULT 'configuracion'::character varying,
    creado_en timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    actualizado_en timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT competencias_estado_check CHECK (((estado)::text = ANY ((ARRAY['configuracion'::character varying, 'en_progreso'::character varying, 'finalizada'::character varying])::text[])))
);
     DROP TABLE public.competencias;
       public         heap    postgres    false            �            1259    16516    competencias_id_seq    SEQUENCE     �   CREATE SEQUENCE public.competencias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.competencias_id_seq;
       public          postgres    false    220            �           0    0    competencias_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.competencias_id_seq OWNED BY public.competencias.id;
          public          postgres    false    219            �            1259    16823    equipo    TABLE     �   CREATE TABLE public.equipo (
    id integer NOT NULL,
    color character varying(50) NOT NULL,
    creado_en timestamp without time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.equipo;
       public         heap    postgres    false            �            1259    16822    equipo_id_seq    SEQUENCE     �   CREATE SEQUENCE public.equipo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.equipo_id_seq;
       public          postgres    false    242            �           0    0    equipo_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.equipo_id_seq OWNED BY public.equipo.id;
          public          postgres    false    241            �            1259    16710    historial_competencias    TABLE     �  CREATE TABLE public.historial_competencias (
    id integer NOT NULL,
    gestion integer NOT NULL,
    version character varying(50) NOT NULL,
    categoria character varying(100) NOT NULL,
    nombre character varying(255) NOT NULL,
    descripcion text,
    fecha_inicio date,
    fecha_fin date,
    total_participantes integer,
    total_rondas integer,
    observaciones text,
    creado_en timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    competencia_id integer
);
 *   DROP TABLE public.historial_competencias;
       public         heap    postgres    false            �            1259    16709    historial_competencias_id_seq    SEQUENCE     �   CREATE SEQUENCE public.historial_competencias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.historial_competencias_id_seq;
       public          postgres    false    238            �           0    0    historial_competencias_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.historial_competencias_id_seq OWNED BY public.historial_competencias.id;
          public          postgres    false    237            �            1259    16684    logs_sistema    TABLE       CREATE TABLE public.logs_sistema (
    id integer NOT NULL,
    usuario_id integer,
    accion character varying(255) NOT NULL,
    tabla_afectada character varying(100),
    registro_id integer,
    detalles jsonb,
    creado_en timestamp without time zone DEFAULT now() NOT NULL
);
     DROP TABLE public.logs_sistema;
       public         heap    postgres    false            �            1259    16683    logs_sistema_id_seq    SEQUENCE     �   CREATE SEQUENCE public.logs_sistema_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.logs_sistema_id_seq;
       public          postgres    false    236            �           0    0    logs_sistema_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.logs_sistema_id_seq OWNED BY public.logs_sistema.id;
          public          postgres    false    235            �            1259    16583    miembros_equipo    TABLE     �   CREATE TABLE public.miembros_equipo (
    id integer NOT NULL,
    participante_id integer,
    equipo_id integer,
    creado_en timestamp without time zone DEFAULT now() NOT NULL
);
 #   DROP TABLE public.miembros_equipo;
       public         heap    postgres    false            �            1259    16582    miembros_equipo_id_seq    SEQUENCE     �   CREATE SEQUENCE public.miembros_equipo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.miembros_equipo_id_seq;
       public          postgres    false    226            �           0    0    miembros_equipo_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.miembros_equipo_id_seq OWNED BY public.miembros_equipo.id;
          public          postgres    false    225            �            1259    16547    participantes    TABLE     �  CREATE TABLE public.participantes (
    id integer NOT NULL,
    nombre_equipo character varying(255) NOT NULL,
    departamento character varying(100) NOT NULL,
    provincia character varying(100) NOT NULL,
    municipio character varying(100) NOT NULL,
    documento_identidad character varying(50) NOT NULL,
    nombre_completo character varying(255) NOT NULL,
    fecha_nacimiento date NOT NULL,
    rol character varying(50) DEFAULT 'participante'::character varying NOT NULL,
    creado_en timestamp without time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp without time zone DEFAULT now() NOT NULL,
    "tutorId" integer,
    "competenciaId" integer
);
 !   DROP TABLE public.participantes;
       public         heap    postgres    false            �            1259    16546    participantes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.participantes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.participantes_id_seq;
       public          postgres    false    224            �           0    0    participantes_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.participantes_id_seq OWNED BY public.participantes.id;
          public          postgres    false    223            �            1259    16531    pistas    TABLE     �  CREATE TABLE public.pistas (
    id integer NOT NULL,
    creado_en timestamp without time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp without time zone DEFAULT now() NOT NULL,
    "competenciaId" integer,
    nombre character varying DEFAULT 'Nombre temporal'::character varying NOT NULL,
    estado public.pistas_estado_enum DEFAULT 'disponible'::public.pistas_estado_enum NOT NULL
);
    DROP TABLE public.pistas;
       public         heap    postgres    false    918    918            �            1259    16530    pistas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pistas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.pistas_id_seq;
       public          postgres    false    222            �           0    0    pistas_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.pistas_id_seq OWNED BY public.pistas.id;
          public          postgres    false    221            �            1259    16644    puntajes    TABLE       CREATE TABLE public.puntajes (
    id integer NOT NULL,
    puntos integer NOT NULL,
    creado_en timestamp without time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp without time zone DEFAULT now() NOT NULL,
    "equipoId" integer,
    "rondaId" integer
);
    DROP TABLE public.puntajes;
       public         heap    postgres    false            �            1259    16643    puntajes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.puntajes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.puntajes_id_seq;
       public          postgres    false    232            �           0    0    puntajes_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.puntajes_id_seq OWNED BY public.puntajes.id;
          public          postgres    false    231            �            1259    16624    ronda_equipos    TABLE     �   CREATE TABLE public.ronda_equipos (
    id integer NOT NULL,
    creado_en timestamp without time zone DEFAULT now() NOT NULL,
    ronda_id integer,
    equipo_id integer
);
 !   DROP TABLE public.ronda_equipos;
       public         heap    postgres    false            �            1259    16623    ronda_equipos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ronda_equipos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.ronda_equipos_id_seq;
       public          postgres    false    230            �           0    0    ronda_equipos_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.ronda_equipos_id_seq OWNED BY public.ronda_equipos.id;
          public          postgres    false    229            �            1259    16603    rondas    TABLE     �  CREATE TABLE public.rondas (
    id integer NOT NULL,
    numero_ronda integer NOT NULL,
    fecha_hora timestamp without time zone,
    creado_en timestamp without time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp without time zone DEFAULT now() NOT NULL,
    "pistaId" integer,
    "competenciaId" integer,
    estado public.rondas_estado_enum DEFAULT 'pendiente'::public.rondas_estado_enum NOT NULL
);
    DROP TABLE public.rondas;
       public         heap    postgres    false    915    915            �            1259    16602    rondas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.rondas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.rondas_id_seq;
       public          postgres    false    228            �           0    0    rondas_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.rondas_id_seq OWNED BY public.rondas.id;
          public          postgres    false    227            �            1259    16506    tutores    TABLE     u  CREATE TABLE public.tutores (
    id integer NOT NULL,
    documento_identidad character varying(50) NOT NULL,
    nombre_completo character varying(255) NOT NULL,
    telefono character varying(20),
    email character varying(100),
    creado_en timestamp without time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.tutores;
       public         heap    postgres    false            �            1259    16505    tutores_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tutores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.tutores_id_seq;
       public          postgres    false    218            �           0    0    tutores_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.tutores_id_seq OWNED BY public.tutores.id;
          public          postgres    false    217            �            1259    16727    usuario    TABLE     m  CREATE TABLE public.usuario (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    rol character varying(50) NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    creado_en timestamp without time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            �            1259    16726    usuario_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.usuario_id_seq;
       public          postgres    false    240            �           0    0    usuario_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;
          public          postgres    false    239            �            1259    16491    usuarios    TABLE     n  CREATE TABLE public.usuarios (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    rol character varying(50) NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    creado_en timestamp without time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.usuarios;
       public         heap    postgres    false            �            1259    16490    usuarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.usuarios_id_seq;
       public          postgres    false    216            �           0    0    usuarios_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;
          public          postgres    false    215            �           2604    16669    clasificados id    DEFAULT     r   ALTER TABLE ONLY public.clasificados ALTER COLUMN id SET DEFAULT nextval('public.clasificados_id_seq'::regclass);
 >   ALTER TABLE public.clasificados ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    233    234    234            �           2604    16835    competencia id    DEFAULT     p   ALTER TABLE ONLY public.competencia ALTER COLUMN id SET DEFAULT nextval('public.competencia_id_seq'::regclass);
 =   ALTER TABLE public.competencia ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    243    244    244            �           2604    16520    competencias id    DEFAULT     r   ALTER TABLE ONLY public.competencias ALTER COLUMN id SET DEFAULT nextval('public.competencias_id_seq'::regclass);
 >   ALTER TABLE public.competencias ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            �           2604    16826 	   equipo id    DEFAULT     f   ALTER TABLE ONLY public.equipo ALTER COLUMN id SET DEFAULT nextval('public.equipo_id_seq'::regclass);
 8   ALTER TABLE public.equipo ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    241    242    242            �           2604    16713    historial_competencias id    DEFAULT     �   ALTER TABLE ONLY public.historial_competencias ALTER COLUMN id SET DEFAULT nextval('public.historial_competencias_id_seq'::regclass);
 H   ALTER TABLE public.historial_competencias ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    237    238    238            �           2604    16687    logs_sistema id    DEFAULT     r   ALTER TABLE ONLY public.logs_sistema ALTER COLUMN id SET DEFAULT nextval('public.logs_sistema_id_seq'::regclass);
 >   ALTER TABLE public.logs_sistema ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    236    235    236            �           2604    16586    miembros_equipo id    DEFAULT     x   ALTER TABLE ONLY public.miembros_equipo ALTER COLUMN id SET DEFAULT nextval('public.miembros_equipo_id_seq'::regclass);
 A   ALTER TABLE public.miembros_equipo ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225    226            �           2604    16550    participantes id    DEFAULT     t   ALTER TABLE ONLY public.participantes ALTER COLUMN id SET DEFAULT nextval('public.participantes_id_seq'::regclass);
 ?   ALTER TABLE public.participantes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223    224            �           2604    16534 	   pistas id    DEFAULT     f   ALTER TABLE ONLY public.pistas ALTER COLUMN id SET DEFAULT nextval('public.pistas_id_seq'::regclass);
 8   ALTER TABLE public.pistas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222            �           2604    16647    puntajes id    DEFAULT     j   ALTER TABLE ONLY public.puntajes ALTER COLUMN id SET DEFAULT nextval('public.puntajes_id_seq'::regclass);
 :   ALTER TABLE public.puntajes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    231    232    232            �           2604    16627    ronda_equipos id    DEFAULT     t   ALTER TABLE ONLY public.ronda_equipos ALTER COLUMN id SET DEFAULT nextval('public.ronda_equipos_id_seq'::regclass);
 ?   ALTER TABLE public.ronda_equipos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229    230            �           2604    16606 	   rondas id    DEFAULT     f   ALTER TABLE ONLY public.rondas ALTER COLUMN id SET DEFAULT nextval('public.rondas_id_seq'::regclass);
 8   ALTER TABLE public.rondas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    227    228    228            �           2604    16509 
   tutores id    DEFAULT     h   ALTER TABLE ONLY public.tutores ALTER COLUMN id SET DEFAULT nextval('public.tutores_id_seq'::regclass);
 9   ALTER TABLE public.tutores ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            �           2604    16730 
   usuario id    DEFAULT     h   ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);
 9   ALTER TABLE public.usuario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    240    239    240            �           2604    16494    usuarios id    DEFAULT     j   ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);
 :   ALTER TABLE public.usuarios ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �          0    16666    clasificados 
   TABLE DATA           q   COPY public.clasificados (id, posicion, puntaje_total, creado_en, "participanteId", "competenciaId") FROM stdin;
    public          postgres    false    234   <�       �          0    16832    competencia 
   TABLE DATA           �   COPY public.competencia (id, nombre, descripcion, fecha_inicio, fecha_fin, numero_clasificados, estado, creado_en, actualizado_en) FROM stdin;
    public          postgres    false    244   ��       �          0    16517    competencias 
   TABLE DATA           �   COPY public.competencias (id, nombre, descripcion, fecha_inicio, fecha_fin, numero_clasificados, estado, creado_en, actualizado_en) FROM stdin;
    public          postgres    false    220   ��       �          0    16823    equipo 
   TABLE DATA           F   COPY public.equipo (id, color, creado_en, actualizado_en) FROM stdin;
    public          postgres    false    242   Ի       �          0    16710    historial_competencias 
   TABLE DATA           �   COPY public.historial_competencias (id, gestion, version, categoria, nombre, descripcion, fecha_inicio, fecha_fin, total_participantes, total_rondas, observaciones, creado_en, competencia_id) FROM stdin;
    public          postgres    false    238   +�       �          0    16684    logs_sistema 
   TABLE DATA           p   COPY public.logs_sistema (id, usuario_id, accion, tabla_afectada, registro_id, detalles, creado_en) FROM stdin;
    public          postgres    false    236   H�       �          0    16583    miembros_equipo 
   TABLE DATA           T   COPY public.miembros_equipo (id, participante_id, equipo_id, creado_en) FROM stdin;
    public          postgres    false    226   >�       �          0    16547    participantes 
   TABLE DATA           �   COPY public.participantes (id, nombre_equipo, departamento, provincia, municipio, documento_identidad, nombre_completo, fecha_nacimiento, rol, creado_en, actualizado_en, "tutorId", "competenciaId") FROM stdin;
    public          postgres    false    224   [�       �          0    16531    pistas 
   TABLE DATA           `   COPY public.pistas (id, creado_en, actualizado_en, "competenciaId", nombre, estado) FROM stdin;
    public          postgres    false    222   ��       �          0    16644    puntajes 
   TABLE DATA           `   COPY public.puntajes (id, puntos, creado_en, actualizado_en, "equipoId", "rondaId") FROM stdin;
    public          postgres    false    232   �       �          0    16624    ronda_equipos 
   TABLE DATA           K   COPY public.ronda_equipos (id, creado_en, ronda_id, equipo_id) FROM stdin;
    public          postgres    false    230   [�       �          0    16603    rondas 
   TABLE DATA           }   COPY public.rondas (id, numero_ronda, fecha_hora, creado_en, actualizado_en, "pistaId", "competenciaId", estado) FROM stdin;
    public          postgres    false    228   x�       �          0    16506    tutores 
   TABLE DATA           w   COPY public.tutores (id, documento_identidad, nombre_completo, telefono, email, creado_en, actualizado_en) FROM stdin;
    public          postgres    false    218   ��       �          0    16727    usuario 
   TABLE DATA           ^   COPY public.usuario (id, email, password, rol, activo, creado_en, actualizado_en) FROM stdin;
    public          postgres    false    240   ��       �          0    16491    usuarios 
   TABLE DATA           _   COPY public.usuarios (id, email, password, rol, activo, creado_en, actualizado_en) FROM stdin;
    public          postgres    false    216   ��                   0    0    clasificados_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.clasificados_id_seq', 4, true);
          public          postgres    false    233                       0    0    competencia_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.competencia_id_seq', 1, false);
          public          postgres    false    243                       0    0    competencias_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.competencias_id_seq', 4, true);
          public          postgres    false    219                       0    0    equipo_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.equipo_id_seq', 2, true);
          public          postgres    false    241                       0    0    historial_competencias_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.historial_competencias_id_seq', 1, false);
          public          postgres    false    237                       0    0    logs_sistema_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.logs_sistema_id_seq', 16, true);
          public          postgres    false    235                       0    0    miembros_equipo_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.miembros_equipo_id_seq', 1, false);
          public          postgres    false    225                       0    0    participantes_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.participantes_id_seq', 4, true);
          public          postgres    false    223                       0    0    pistas_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.pistas_id_seq', 4, true);
          public          postgres    false    221            	           0    0    puntajes_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.puntajes_id_seq', 4, true);
          public          postgres    false    231            
           0    0    ronda_equipos_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.ronda_equipos_id_seq', 1, false);
          public          postgres    false    229                       0    0    rondas_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.rondas_id_seq', 4, true);
          public          postgres    false    227                       0    0    tutores_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.tutores_id_seq', 4, true);
          public          postgres    false    217                       0    0    usuario_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.usuario_id_seq', 1, false);
          public          postgres    false    239                       0    0    usuarios_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.usuarios_id_seq', 6, true);
          public          postgres    false    215            (           2606    16830 %   equipo PK_a545d29b4870688c462189447da 
   CONSTRAINT     e   ALTER TABLE ONLY public.equipo
    ADD CONSTRAINT "PK_a545d29b4870688c462189447da" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public.equipo DROP CONSTRAINT "PK_a545d29b4870688c462189447da";
       public            postgres    false    242            $           2606    16737 &   usuario PK_a56c58e5cabaa04fb2c98d2d7e2 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2";
       public            postgres    false    240            *           2606    16843 *   competencia PK_e5c3f47e057a120138cd68862b3 
   CONSTRAINT     j   ALTER TABLE ONLY public.competencia
    ADD CONSTRAINT "PK_e5c3f47e057a120138cd68862b3" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.competencia DROP CONSTRAINT "PK_e5c3f47e057a120138cd68862b3";
       public            postgres    false    244            &           2606    16739 &   usuario UQ_2863682842e688ca198eb25c124 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE (email);
 R   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "UQ_2863682842e688ca198eb25c124";
       public            postgres    false    240                       2606    16880 .   miembros_equipo UQ_60a6837d92ab29f9c2bf5d7a7c7 
   CONSTRAINT     �   ALTER TABLE ONLY public.miembros_equipo
    ADD CONSTRAINT "UQ_60a6837d92ab29f9c2bf5d7a7c7" UNIQUE (participante_id, equipo_id);
 Z   ALTER TABLE ONLY public.miembros_equipo DROP CONSTRAINT "UQ_60a6837d92ab29f9c2bf5d7a7c7";
       public            postgres    false    226    226                       2606    16882 '   puntajes UQ_7922591b3c694e95b6738cc992c 
   CONSTRAINT     u   ALTER TABLE ONLY public.puntajes
    ADD CONSTRAINT "UQ_7922591b3c694e95b6738cc992c" UNIQUE ("equipoId", "rondaId");
 S   ALTER TABLE ONLY public.puntajes DROP CONSTRAINT "UQ_7922591b3c694e95b6738cc992c";
       public            postgres    false    232    232                       2606    16672    clasificados clasificados_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.clasificados
    ADD CONSTRAINT clasificados_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.clasificados DROP CONSTRAINT clasificados_pkey;
       public            postgres    false    234                       2606    16529    competencias competencias_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.competencias
    ADD CONSTRAINT competencias_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.competencias DROP CONSTRAINT competencias_pkey;
       public            postgres    false    220            "           2606    16718 2   historial_competencias historial_competencias_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.historial_competencias
    ADD CONSTRAINT historial_competencias_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.historial_competencias DROP CONSTRAINT historial_competencias_pkey;
       public            postgres    false    238                        2606    16692    logs_sistema logs_sistema_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.logs_sistema
    ADD CONSTRAINT logs_sistema_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.logs_sistema DROP CONSTRAINT logs_sistema_pkey;
       public            postgres    false    236                       2606    16589 $   miembros_equipo miembros_equipo_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.miembros_equipo
    ADD CONSTRAINT miembros_equipo_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.miembros_equipo DROP CONSTRAINT miembros_equipo_pkey;
       public            postgres    false    226                       2606    16561 3   participantes participantes_documento_identidad_key 
   CONSTRAINT     }   ALTER TABLE ONLY public.participantes
    ADD CONSTRAINT participantes_documento_identidad_key UNIQUE (documento_identidad);
 ]   ALTER TABLE ONLY public.participantes DROP CONSTRAINT participantes_documento_identidad_key;
       public            postgres    false    224                       2606    16559 -   participantes participantes_nombre_equipo_key 
   CONSTRAINT     q   ALTER TABLE ONLY public.participantes
    ADD CONSTRAINT participantes_nombre_equipo_key UNIQUE (nombre_equipo);
 W   ALTER TABLE ONLY public.participantes DROP CONSTRAINT participantes_nombre_equipo_key;
       public            postgres    false    224                       2606    16557     participantes participantes_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.participantes
    ADD CONSTRAINT participantes_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.participantes DROP CONSTRAINT participantes_pkey;
       public            postgres    false    224            
           2606    16540    pistas pistas_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.pistas
    ADD CONSTRAINT pistas_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.pistas DROP CONSTRAINT pistas_pkey;
       public            postgres    false    222                       2606    16652    puntajes puntajes_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.puntajes
    ADD CONSTRAINT puntajes_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.puntajes DROP CONSTRAINT puntajes_pkey;
       public            postgres    false    232                       2606    16630     ronda_equipos ronda_equipos_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.ronda_equipos
    ADD CONSTRAINT ronda_equipos_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.ronda_equipos DROP CONSTRAINT ronda_equipos_pkey;
       public            postgres    false    230                       2606    16612    rondas rondas_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.rondas
    ADD CONSTRAINT rondas_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.rondas DROP CONSTRAINT rondas_pkey;
       public            postgres    false    228                       2606    16515 '   tutores tutores_documento_identidad_key 
   CONSTRAINT     q   ALTER TABLE ONLY public.tutores
    ADD CONSTRAINT tutores_documento_identidad_key UNIQUE (documento_identidad);
 Q   ALTER TABLE ONLY public.tutores DROP CONSTRAINT tutores_documento_identidad_key;
       public            postgres    false    218                       2606    16513    tutores tutores_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.tutores
    ADD CONSTRAINT tutores_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.tutores DROP CONSTRAINT tutores_pkey;
       public            postgres    false    218                        2606    16504    usuarios usuarios_email_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);
 E   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_email_key;
       public            postgres    false    216                       2606    16502    usuarios usuarios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public            postgres    false    216            :           2620    16706 $   competencias tr_auditar_competencias    TRIGGER     �   CREATE TRIGGER tr_auditar_competencias AFTER INSERT OR DELETE OR UPDATE ON public.competencias FOR EACH ROW EXECUTE FUNCTION public.fn_auditoria_universal();
 =   DROP TRIGGER tr_auditar_competencias ON public.competencias;
       public          postgres    false    220    256            ;           2620    16704 &   participantes tr_auditar_participantes    TRIGGER     �   CREATE TRIGGER tr_auditar_participantes AFTER INSERT OR DELETE OR UPDATE ON public.participantes FOR EACH ROW EXECUTE FUNCTION public.fn_auditoria_universal();
 ?   DROP TRIGGER tr_auditar_participantes ON public.participantes;
       public          postgres    false    224    256            =           2620    16705    puntajes tr_auditar_puntajes    TRIGGER     �   CREATE TRIGGER tr_auditar_puntajes AFTER INSERT OR DELETE OR UPDATE ON public.puntajes FOR EACH ROW EXECUTE FUNCTION public.fn_auditoria_universal();
 5   DROP TRIGGER tr_auditar_puntajes ON public.puntajes;
       public          postgres    false    232    256            <           2620    16707    rondas tr_auditar_rondas    TRIGGER     �   CREATE TRIGGER tr_auditar_rondas AFTER INSERT OR DELETE OR UPDATE ON public.rondas FOR EACH ROW EXECUTE FUNCTION public.fn_auditoria_universal();
 1   DROP TRIGGER tr_auditar_rondas ON public.rondas;
       public          postgres    false    256    228            ,           2606    16943 ,   participantes FK_2b59a086ddc51f771c0176ccbc1    FK CONSTRAINT     �   ALTER TABLE ONLY public.participantes
    ADD CONSTRAINT "FK_2b59a086ddc51f771c0176ccbc1" FOREIGN KEY ("competenciaId") REFERENCES public.competencia(id) ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.participantes DROP CONSTRAINT "FK_2b59a086ddc51f771c0176ccbc1";
       public          postgres    false    4906    244    224            4           2606    16898 '   puntajes FK_3ea7b9e8c58c60488b55ec3b78d    FK CONSTRAINT     �   ALTER TABLE ONLY public.puntajes
    ADD CONSTRAINT "FK_3ea7b9e8c58c60488b55ec3b78d" FOREIGN KEY ("rondaId") REFERENCES public.rondas(id) ON DELETE CASCADE;
 S   ALTER TABLE ONLY public.puntajes DROP CONSTRAINT "FK_3ea7b9e8c58c60488b55ec3b78d";
       public          postgres    false    4886    232    228            .           2606    16883 .   miembros_equipo FK_411c6c6ea10511e8f87e638606b    FK CONSTRAINT     �   ALTER TABLE ONLY public.miembros_equipo
    ADD CONSTRAINT "FK_411c6c6ea10511e8f87e638606b" FOREIGN KEY (participante_id) REFERENCES public.participantes(id) ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.miembros_equipo DROP CONSTRAINT "FK_411c6c6ea10511e8f87e638606b";
       public          postgres    false    224    4880    226            0           2606    16918 %   rondas FK_4a49f005b18e553d29ff42dca8b    FK CONSTRAINT     �   ALTER TABLE ONLY public.rondas
    ADD CONSTRAINT "FK_4a49f005b18e553d29ff42dca8b" FOREIGN KEY ("competenciaId") REFERENCES public.competencia(id) ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.rondas DROP CONSTRAINT "FK_4a49f005b18e553d29ff42dca8b";
       public          postgres    false    4906    244    228            1           2606    16913 %   rondas FK_4abefb08ee6e8b5cb84e0b1a0a8    FK CONSTRAINT     �   ALTER TABLE ONLY public.rondas
    ADD CONSTRAINT "FK_4abefb08ee6e8b5cb84e0b1a0a8" FOREIGN KEY ("pistaId") REFERENCES public.pistas(id) ON DELETE SET NULL;
 Q   ALTER TABLE ONLY public.rondas DROP CONSTRAINT "FK_4abefb08ee6e8b5cb84e0b1a0a8";
       public          postgres    false    228    4874    222            6           2606    16933 +   clasificados FK_68d426a09b736a7a34989233ff7    FK CONSTRAINT     �   ALTER TABLE ONLY public.clasificados
    ADD CONSTRAINT "FK_68d426a09b736a7a34989233ff7" FOREIGN KEY ("competenciaId") REFERENCES public.competencia(id) ON DELETE CASCADE;
 W   ALTER TABLE ONLY public.clasificados DROP CONSTRAINT "FK_68d426a09b736a7a34989233ff7";
       public          postgres    false    4906    244    234            7           2606    16928 +   clasificados FK_74a00c76c0384b962216bb55fda    FK CONSTRAINT     �   ALTER TABLE ONLY public.clasificados
    ADD CONSTRAINT "FK_74a00c76c0384b962216bb55fda" FOREIGN KEY ("participanteId") REFERENCES public.participantes(id) ON DELETE CASCADE;
 W   ALTER TABLE ONLY public.clasificados DROP CONSTRAINT "FK_74a00c76c0384b962216bb55fda";
       public          postgres    false    234    4880    224            /           2606    16888 .   miembros_equipo FK_9599a247ddad28b407d58ebe432    FK CONSTRAINT     �   ALTER TABLE ONLY public.miembros_equipo
    ADD CONSTRAINT "FK_9599a247ddad28b407d58ebe432" FOREIGN KEY (equipo_id) REFERENCES public.equipo(id) ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.miembros_equipo DROP CONSTRAINT "FK_9599a247ddad28b407d58ebe432";
       public          postgres    false    242    4904    226            2           2606    16953 ,   ronda_equipos FK_b125bfec5c1ef9b0e161efe7480    FK CONSTRAINT     �   ALTER TABLE ONLY public.ronda_equipos
    ADD CONSTRAINT "FK_b125bfec5c1ef9b0e161efe7480" FOREIGN KEY (ronda_id) REFERENCES public.rondas(id) ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.ronda_equipos DROP CONSTRAINT "FK_b125bfec5c1ef9b0e161efe7480";
       public          postgres    false    228    4886    230            +           2606    16923 %   pistas FK_c2c4dc6c301272917db367b316c    FK CONSTRAINT     �   ALTER TABLE ONLY public.pistas
    ADD CONSTRAINT "FK_c2c4dc6c301272917db367b316c" FOREIGN KEY ("competenciaId") REFERENCES public.competencia(id) ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.pistas DROP CONSTRAINT "FK_c2c4dc6c301272917db367b316c";
       public          postgres    false    244    222    4906            -           2606    16938 ,   participantes FK_c8dbb11860df5867e8ed5387401    FK CONSTRAINT     �   ALTER TABLE ONLY public.participantes
    ADD CONSTRAINT "FK_c8dbb11860df5867e8ed5387401" FOREIGN KEY ("tutorId") REFERENCES public.tutores(id) ON DELETE SET NULL;
 X   ALTER TABLE ONLY public.participantes DROP CONSTRAINT "FK_c8dbb11860df5867e8ed5387401";
       public          postgres    false    224    218    4870            5           2606    16893 '   puntajes FK_d3c45108cfd3b20f91715eb60b7    FK CONSTRAINT     �   ALTER TABLE ONLY public.puntajes
    ADD CONSTRAINT "FK_d3c45108cfd3b20f91715eb60b7" FOREIGN KEY ("equipoId") REFERENCES public.ronda_equipos(id) ON DELETE CASCADE;
 S   ALTER TABLE ONLY public.puntajes DROP CONSTRAINT "FK_d3c45108cfd3b20f91715eb60b7";
       public          postgres    false    4888    230    232            3           2606    16958 ,   ronda_equipos FK_db6dace407f5ae0cae3155fce73    FK CONSTRAINT     �   ALTER TABLE ONLY public.ronda_equipos
    ADD CONSTRAINT "FK_db6dace407f5ae0cae3155fce73" FOREIGN KEY (equipo_id) REFERENCES public.equipo(id) ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.ronda_equipos DROP CONSTRAINT "FK_db6dace407f5ae0cae3155fce73";
       public          postgres    false    242    4904    230            8           2606    16948 +   logs_sistema FK_f4eb8b21d4fea24bd7c772a2445    FK CONSTRAINT     �   ALTER TABLE ONLY public.logs_sistema
    ADD CONSTRAINT "FK_f4eb8b21d4fea24bd7c772a2445" FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE SET NULL;
 W   ALTER TABLE ONLY public.logs_sistema DROP CONSTRAINT "FK_f4eb8b21d4fea24bd7c772a2445";
       public          postgres    false    216    236    4866            9           2606    16721 A   historial_competencias historial_competencias_competencia_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.historial_competencias
    ADD CONSTRAINT historial_competencias_competencia_id_fkey FOREIGN KEY (competencia_id) REFERENCES public.competencias(id) ON DELETE SET NULL;
 k   ALTER TABLE ONLY public.historial_competencias DROP CONSTRAINT historial_competencias_competencia_id_fkey;
       public          postgres    false    4872    238    220            �   K   x����� Cѳ3E %�`�N��s4��'����J/:
�ck��mTZPΛ�����z;��E�T� _�i      �      x������ � �      �     x���MN�0F��)|W���6���	M��<��l�SW!c���E�dY��x��3bK1x����4�j�������!Hc���_#4b*R�(�K���:�Չ��Bn��SA�t��J�u�-˴XX��z��UbY��D��G�`�m��b�SD:J��'S�Liv��G��K:
�C<���37��jܓ|��>\D�B�-"Z��f�\�_r�친�m�:���T��G���˻! E�����=�n�q��Bi�ӈٿ���H���â�      �   G   x�3�,����4202�50�5�T04�24�2�Գ01��4�#�eęXU�������X����S3�W� �%x      �      x������ � �      �   �  x�ŗ͎�:���SX�K�8v�tZ�^h��U%dC��ԉ+]�>L�]tQ�#��z�P @H2L�4�9����·cv޿���7ד�N �1M)I:f�K���!��f�	�rE?��!|��D���z�;g�DlEB����LR�>�S�^��	�@����$�)�������71C�?�ܧ��cc�M�4�@�p����f��&�1���MH�@�X���m �p�2�R��.���2�����Sژ�*k��\-�� "	�� �p��~�l�О��b�k��@�9[(�k]�����[1��Sx(M�>���3�}��(��o�H�d� ���PA��ܸ<	���UC�*��|K��4e�iB����&7��	8=���AL$���Č ��Z|��/�oW�o׈o7-� 1�d�(z�8�|.�uI�B��A��A�T�[��W��Qr����h4�������L�tc�B�Ҫą.#�ޒ�^�r��S��屒,�D��>�,)O�<
�S�I�8���F����;��k}��-���>��H�8��C�B��>��-r������b��t��8E*��}Nw0�~�uGo��A�� ���z������gd9#0}�˺r��,{ ����r��?ItD���[h�	zG�$'pz@���T�4M�-˶�g58��8�̢z��8�`?�|�k�2���fٷ�g���\��\u����ǡ��S}Π+�kP�2�_��Q��xݸ+�:�����w��@�*�6�qk�9�=��4�H%E���8�{�R%��G��೎�s=Qǔ�b�i�E���z�8�O�f�涆�`��<<�=)f�Ã�d�!5+��h;���Z�x~S<��i
��e謁�H�y�@|	E�CEڽ<Đ�:}�-��2���hw��`�X�H��w�X�$��𮭍����� ��AB�z��*���c�5���,�тk]�5�9ǂkRܛ��\˚��u����I�n���k��w��7��O���~ѣ�
      �      x������ � �      �   6  x����n�0���S��l�?MUT�U''q!*����td`��~�:E�������ӧ�8do��'Una&�B���w;��4I�8�f�$�tKr{l*Փ��<�c	e!������ۋ������t�c?	��U��x���S�Ԧ�L�[Y�}!!SX�J_�8��� �q�%Yړ�|���� �R�'����0�z��V�$�&M��ؒ�¾����(��$Yep[��&,�����?�(���C��tU._�0G��W�9���V�Ş$�US���u�-��S�Ag:���Y�<����      �   T   x�3�4202�50�5�P0��21�26�32472��'��闟�T��P��[�_��Ù�Y\�������eDS�ib�	ML����� 2"Vw      �   F   x�3�41�4202�50�5�P0��21�26�32472��'�D\F��`�ij@�&�&F���� 3F2~      �      x������ � �      �   L   x�3�4���4202�50�5�P0��21�26�32472��'�D�y)��y%�\F�F�3̘�.3�4��a1z\\\ �AC�      �   �   x��нN�0����~�Z��3�
�P+���XNm@E�9��o��ЉG���T�,�����N���Ji�maG)_��u)�p��l�/q�D��N�_K�9o:��@�f%�
=��Z����CQ��*c�u����?(�6���p�g'��
%����.-7Ե��Y���M ��?c!�b*�aަ��>��A�w�C��P��Ğ)���Z*����pM�󚖢/���_czX      �      x������ � �      �   �   x���KO�P����
�r33���2��X�����}���-m���Hw�X��d�|9�l�Yy_WQ���F�U����-# }ƈ�;�e:��&�}���~ڴ�S�o|3U�.k���z�oƪ����>L��Q�!h��Wr��eM�E����O������V���T�S�f⇪���pr�'�(A���7�kyVǜv�!ֳ�:v}��Ừ�iل�,�f��e�h��e�mo���.��� I0�+������     