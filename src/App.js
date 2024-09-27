import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import "./theme.css";
import axios from 'axios';

// Datos iniciales simulados
const initialUsers = [
  { id: 1, username: "usuario1", email: "usuario1@gmail.com" },
  { id: 2, username: "usuario2", email: "usuario2@gmail.com" },
];



const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [users, setUsers] = useState(initialUsers);
  const [view, setView] = useState("dashboard");
  const [newUser, setNewUser] = useState({ username: "", email: "" });
  const [editUserId, setEditUserId] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "1234") {
      setRole("admin");
      setIsLoggedIn(true);
    } else if (username === "user" && password === "abcd") {
      setRole("user");
      setIsLoggedIn(true);
    } else {
      alert("Credenciales incorrectas");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setRole("");
    setView("dashboard");
  };

  // Funciones CRUD
  const handleAddUser = (e) => {
    e.preventDefault();
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    setUsers([...users, { id, ...newUser }]);
    setNewUser({ username: "", email: "" });
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEditUser = (user) => {
    setEditUserId(user.id);
    setNewUser(user);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    setUsers(users.map((user) => (user.id === editUserId ? newUser : user)));
    setEditUserId(null);
    setNewUser({ username: "", email: "" });
  };

  return (
    <div className="container mt-5">
      {!isLoggedIn ? (
        <div className="row justify-content-center">
          <div className="col-md-4">
            <h2 className="text-center mb-4">Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Usuario
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Ingresar
              </button>
            </form>
          </div>
        </div>
      ) : role === "admin" ? (
        <div className="text-center">
          <h1>Bienvenido, Administrador</h1>

          {view === "dashboard" ? (
            <>
              <p>Aquí puedes gestionar los usuarios, configuraciones y reportes.</p>
              <div className="mt-4">
                <button className="btn btn-secondary m-2" onClick={() => setView("viewUsers")}>
                  Ver Usuarios
                </button>
                <button className="btn btn-secondary m-2" onClick={() => setView("settings")}>
                  Configuración
                </button>
                <button className="btn btn-secondary m-2" onClick={() => setView("reports")}>
                  Reportes
                </button>
              </div>
              <button className="btn btn-danger mt-3" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </>
          ) : view === "viewUsers" ? (
            <>
              <h3>Lista de Usuarios</h3>

              {/* Formulario para agregar o editar usuarios */}
              <form className="mb-4" onSubmit={editUserId ? handleUpdateUser : handleAddUser}>
                <div className="row justify-content-center">
                  <div className="col-md-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre de usuario"
                      value={newUser.username}
                      onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-2">
                    <button type="submit" className="btn btn-primary w-100">
                      {editUserId ? "Actualizar" : "Agregar"}
                    </button>
                  </div>
                </div>
              </form>

              {/* Lista de usuarios */}
              <ul className="list-group">
                {users.map((user) => (
                  <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{user.username} ({user.email})</span>
                    <div>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEditUser(user)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <button className="btn btn-secondary mt-3" onClick={() => setView("dashboard")}>
                Volver
              </button>
            </>
          ) : view === "settings" ? (
            <>
              <h3>Configuraciones</h3>
              <p>Aquí puedes gestionar la configuración de la aplicación (placeholder).</p>
              <button className="btn btn-secondary mt-3" onClick={() => setView("dashboard")}>
                Volver
              </button>
            </>
          ) : view === "reports" ? (
            <>
              <h3>Reportes</h3>
              <p>Aquí puedes generar reportes (placeholder).</p>
              <button className="btn btn-secondary mt-3" onClick={() => setView("dashboard")}>
                Volver
              </button>
            </>
          ) : null}
        </div>
      ) : (
        <div className="text-center">
          <h1>Bienvenido, Usuario</h1>
          {view === "dashboard" ? (
            <>
              <p>Consulta tu información personal y accede a los recursos disponibles.</p>
              <div className="mt-4">
                <button className="btn btn-secondary m-2" onClick={() => setView("profile")}>
                  Ver Perfil
                </button>
                <button className="btn btn-secondary m-2" onClick={() => setView("tasks")}>
                  Mis Tareas
                </button>
                <button className="btn btn-secondary m-2" onClick={() => setView("help")}>
                  Ayuda
                </button>
              </div>
              <button className="btn btn-danger mt-3" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </>
          ) : view === "profile" ? (
            <>
              <h3>Perfil</h3>
              <div class="card mb-3">
    <div class="card-header position-relative min-vh-25 mb-7">
        <div class="bg-holder rounded-3 rounded-bottom-0"></div>

        <div class="avatar avatar-5xl avatar-profile">
            <img class="rounded-circle img-thumbnail shadow-sm" src="https://yt3.googleusercontent.com/uIdsvd0fLl03uO6xTbeZ6K9WVKd_uzZP7NEwf1NGUTjm3YzQivQVEJXlQL2jthCsE55pNKeyd0A=s160-c-k-c0x00ffffff-no-rj" width="200" alt="Shrek"/>
        </div>
    </div>
    <div class="card-body">
        <div class="row">
            <div class="col-lg-8">
                <h4 class="mb-1">
                        Shreck Buchón Garza
                    <span data-bs-toggle="tooltip" data-bs-placement="right" title="Verified">
                        <small class="fa fa-check-circle text-primary" data-fa-transform="shrink-4 down-2"></small>
                    </span>
                </h4>
                <h5 class="fs-9 fw-normal">Trainee</h5>
                <p class="text-500">Pesquería, Nuevo León</p>
                <button class="btn btn-falcon-primary btn-sm px-3" type="button">Premios</button>
                <button class="btn btn-falcon-default btn-sm px-3 ms-2" type="button">Ver más</button>
                <div class="border-bottom border-dashed my-4 d-lg-none"></div>
            </div>
            <div class="col ps-2 ps-lg-3">
                <a class="d-flex align-items-center mb-2" href="#">
                    <span class="fas fa-user-circle fs-6 me-2 text-700" data-fa-transform="grow-2"></span>
                    <div class="flex-1">
                        <h6 class="mb-0">Logros (13)</h6>
                    </div>
                </a>
                <a class="d-flex align-items-center mb-2" href="#">
                    <img class="align-self-center me-2" src="img/logos/g.png" alt="Generic placeholder image" width="30"/>
                    <div class="flex-1">
                        <h6 class="mb-0">Facebook</h6>
                    </div>
                </a>
                <a class="d-flex align-items-center mb-2" href="#">
                    <img class="align-self-center me-2" src="img/logos/apple.png" alt="Generic placeholder image" width="30"/>
                    <div class="flex-1">
                        <h6 class="mb-0">Twitter (X)</h6>
                    </div>
                </a>
                <a class="d-flex align-items-center mb-2" href="#">
                    <img class="align-self-center me-2" src="img/logos/hp.png" alt="Generic placeholder image" width="30"/>
                    <div class="flex-1">
                        <h6 class="mb-0">KIA</h6>
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>
              <button className="btn btn-secondary mt-3" onClick={() => setView("dashboard")}>
                Volver
              </button>
            </>
          ) : view === "tasks" ? (
            <>
              <h3>Mis Tareas</h3>
              <p>Aquí puedes ver tus tareas asignadas (placeholder).</p>
              <div class="card mb-3">
                <div class="card-header bg-body-tertiary d-flex justify-content-between">
                  <h5 class="mb-0">Monitor de Actividad</h5><a class="font-sans-serif" href="../../app/social/activity-log.html">Ver todo</a>
                </div>
                <div class="card-body fs-10 p-0">
                  <a class="border-bottom-0 notification rounded-0 border-x-0 border border-300" href="#!">
                    <div class="notification-avatar">
                      <div class="avatar avatar-xl me-3">
                        <div class="avatar-emoji rounded-circle "><span role="img" aria-label="Emoji">🎁</span></div>
                      </div>
                    </div>
                    <div class="notification-body">
                      <p class="mb-1"><strong>¡Excelente!</strong> Obtuviste un <strong>logro</strong></p>
                      <span class="notification-time">24 de septiembre, 6:23 AM</span>

                    </div>
                  </a>

                  <a class="border-bottom-0 notification rounded-0 border-x-0 border border-300" href="#!">
                    <div class="notification-avatar">
                      <div class="avatar avatar-xl me-3">
                        <div class="avatar-emoji rounded-circle "><span role="img" aria-label="Emoji">🏷️</span></div>
                      </div>
                    </div>
                    <div class="notification-body">
                      <p class="mb-1"><strong>¡Excelente!</strong> ganaste una <strong>partida</strong>.</p>
                      <span class="notification-time">23 de septiembre, 5:47 PM</span>

                    </div>
                  </a>

                  <a class="border-bottom-0 notification rounded-0 border-x-0 border border-300" href="#!">
                    <div class="notification-avatar">
                      <div class="avatar avatar-xl me-3">
                        <div class="avatar-emoji rounded-circle "><span role="img" aria-label="Emoji">📋️</span></div>
                      </div>
                    </div>
                    <div class="notification-body">
                      <p class="mb-1"><strong>¡Alerta!</strong> tienes una <strong>actividad pendiente</strong> dentro de la <strong>partida</strong></p>
                      <span class="notification-time">21 de septiembre, 11:30 AM</span>

                    </div>
                  </a>

                  <a class="notification border-x-0 border-bottom-0 border-300 rounded-top-0" href="#!">
                    <div class="notification-avatar">
                      <div class="avatar avatar-xl me-3">
                        <div class="avatar-emoji rounded-circle "><span role="img" aria-label="Emoji">📅️</span></div>
                      </div>
                    </div>
                    <div class="notification-body">
                      <p class="mb-1"><strong>¡</strong>Se cumple un año de iniciar tu programa en <strong>KIA Drive Deck</strong></p>
                      <span class="notification-time">20 de septiembre, 12:00 PM</span>

                    </div>
                  </a>

                </div>
              </div>
              <button className="btn btn-secondary mt-3" onClick={() => setView("dashboard")}>
                Volver
              </button>
            </>
          ) : view === "help" ? (
            <>
              <h3>Wiki de Ayuda</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae
                vestibulum vestibulum. Cras venenatis euismod malesuada.
              </p>
              <button className="btn btn-secondary mt-3" onClick={() => setView("dashboard")}>
                Volver
              </button>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};
function Ver() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

 

  return (

    <Router>

      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />

        <Route

          path="/dashboard"

          element={

            <ProtectedRoute isAuthenticated={isAuthenticated}>

              <Dashboard />

            </ProtectedRoute>

          }

        />

      </Routes>

    </Router>

  );



const [users, setUsers] = useState([]);

 

  useEffect(() => {

    // Hacer la solicitud GET al backend

    axios.get('http://localhost:5000/api/Usuario')

      .then((response) => {

        setUsers(response.data);

      })

      .catch((error) => {

        console.error('There was an error fetching the data:', error);

      });

  }, []);

 

  return (

    <div className="App">

      <h1>Lista de Usuarios</h1>

      <ul>

        {users.map(user => (

          <li key={user.id}>{user.name}</li>

        ))}

      </ul>

    </div>

  );

}


export default App;