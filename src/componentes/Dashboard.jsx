import { useEffect } from "react";
import Agregar from "./Agregar";
import Listado from "./Listado";
import Analisis from "./Analisis";
import InformeEventos from "./InformeEventos";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { guardarEventos } from "../features/eventosSlice";
import { guardarCategorias } from "../features/categoriasSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("user") === null) { navigate('/'); return; }
    const id = localStorage.getItem("id");
    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
      'apikey': localStorage.getItem('apikey'),
      'iduser': id,
    };
    fetch(`https://babytracker.develotion.com/categorias.php`, { method: 'GET', headers })
      .then(r => r.json())
      .then(json => {
        dispatch(guardarCategorias(json.categorias));
        fetch(`https://babytracker.develotion.com/eventos.php?idUsuario=${id}`, { method: 'GET', headers })
          .then(r => r.json())
          .then(json => dispatch(guardarEventos(json.eventos)));
      });
  }, []);

  const logout = () => { localStorage.clear(); navigate('/'); };

  return (
    <div className="container text-center d-flex flex-column" style={{ minHeight: '100vh', paddingTop: '2vh', paddingBottom: '2vh' }}>
      <div className="row align-items-center mb-2 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #F8BBD9 0%, #FCE4EC 100%)', borderRadius: '14px', padding: '12px 20px' }}>
        <div className="col d-flex align-items-center gap-2">
          <span style={{ fontSize: '28px' }}>🍼</span>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '11px', color: '#C2185B', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>Bienvenida/o</div>
            <div style={{ fontSize: '20px', color: '#4A2040', fontWeight: 800, letterSpacing: '0.5px', lineHeight: 1.2 }}>
              {localStorage.getItem('user')} <span style={{ color: '#E91E63' }}>✨</span>
            </div>
          </div>
        </div>
        <div className="col-auto">
          <button
            type="button"
            onClick={logout}
            style={{ background: '#E91E63', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
      <div className="row gx-2 mt-2 align-items-stretch" style={{ paddingBottom: '20px' }}>
        <div className="col-12 col-md-4 insertar d-flex mb-2 mb-md-0">
          <Agregar />
        </div>
        <div className="col-12 col-md-8 listado d-flex">
          <Listado />
        </div>
      </div>
      <div className="row gx-2">
        <div className="col-12 col-md-8 d-flex mb-2 mb-md-0">
          <Analisis />
        </div>
        <div className="col-12 col-md-4 d-flex">
          <InformeEventos />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
