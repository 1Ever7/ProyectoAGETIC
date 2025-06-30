(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/dashboard/participantes/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Participantes)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function Participantes() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
        children: "Hola Participantes"
    }, void 0, false, {
        fileName: "[project]/src/app/dashboard/participantes/page.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
} /*export default function ParticipantesPage() {
  const [participantes, setParticipantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState({ nombre: '', departamento: '', municipio: '' });

  const [modalOpen, setModalOpen] = useState(false);
//  const [editData, setEditData] = useState(null);

const [editData, setEditData] = useState<Participante | null>(null);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getParticipantes(filtro);
      setParticipantes(res.data);
    } catch (e) {
      console.error('Error al obtener participantes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filtro]);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Participantes
      </Typography>

      <Stack direction="row" spacing={2} mb={2}>
        <TextField label="Nombre" onChange={(e) => setFiltro({ ...filtro, nombre: e.target.value })} />
        <TextField label="Departamento" onChange={(e) => setFiltro({ ...filtro, departamento: e.target.value })} />
        <TextField label="Municipio" onChange={(e) => setFiltro({ ...filtro, municipio: e.target.value })} />
        <Button variant="contained" onClick={fetchData}>Buscar</Button>
        <Button variant="outlined" onClick={() => {
          setEditData(null);
          setModalOpen(true);
        }}>
          Agregar Participante
        </Button>
      </Stack>

      {loading ? (
        <CircularProgress />
      ) : (
        <ParticipantesTable
          participantes={participantes}
          onRefresh={fetchData}
          onEdit={(data: Participante) => {
            setEditData(data);
            setModalOpen(true);
        }}

        />
      )}

      <ParticipanteForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchData}
        initialData={editData}
      />
    </Box>
  );
}*/ 
_c = Participantes;
var _c;
__turbopack_context__.k.register(_c, "Participantes");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_app_dashboard_participantes_page_tsx_ddadad20._.js.map