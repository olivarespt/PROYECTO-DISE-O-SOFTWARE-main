import  {useContext, useState} from 'react';
import {LanguageContext} from '../context/LanguageContext';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const  {language, setLanguage, t} = useContext(LanguageContext); //language context conection
  
  const [isLoginOpen, setIsLoginOpen]= useState(false);
  const [user, setUser] = useState(() => {
  const saved = localStorage.getItem('pokedex_sso_user');
  return saved ? JSON.parse(saved) : null;
});
  
  //handler SSO login
  const handleSSOLogin = () => {
    setIsLoginOpen(true);
  };

  const handleGoogleSuccess = (credentialResponse) => {
  const decoded = jwtDecode(credentialResponse.credential);
  const userData = {
    name: decoded.name,
    email: decoded.email,
    picture: decoded.picture,
  };
  setUser(userData);
  localStorage.setItem('pokedex_sso_user', JSON.stringify(userData));
  setIsLoginOpen(false);
};

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem('pokedex_user');
  };

  return(
    <>
    <nav className="w-full bg-red-600 text-white p-4 shadow-md flex justify-between items-center flex-wrap">
      
      {/* app title */}
      <div className="text-2xl font-bold tracking-wider">
        {t('appName')}
      </div>
      {/* User connected centered */}
      {user && (
        <div className="flex items-center gap-2 bg-red-700 px-3 py-1 rounded-full text-sm font-semibold">
          {user.picture && (
            <img
              src={user.picture}
              alt={user.name}
              className="w-6 h-6 rounded-full"
              referedPolicy="no-referrer"
            />
          )}
          <span> {user.name} </span>
        </div>
      )}
      

      {/* Controls: language and SSO */}
      <div className="flex items-center gap-4 mt-2 sm:mt-0">
        
        {/* Language swap */}
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-red-700 text-white border border-red-400 px-2 py-1 rounded cursor-pointer outline-none"
        >
          <option value="esp" className="text-black">Español</option>
          <option value="eng" className="text-black">English</option>
        </select>

        {user ? (
       <button
         onClick={handleLogout}
         className="bg-white text-red-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition-colors cursor-pointer"
       >
         {language === 'eng' ? 'Log out' : 'Cerrar sesión'}
       </button>
     ) : (
       <button
         onClick={handleSSOLogin}
         className="bg-white text-red-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition-colors cursor-pointer"
       >
         {t('loginSSO')}
       </button>
     )}
        
      </div>
    </nav>


      {/* login modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm mx-4 flex flex-col items-center gap-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {t('loginSSO')}
            </h3>
            <p className="text-sm text-gray-500 text-center">
           {language === 'eng'
             ? 'Sign in with your Google account to manage your collection.'
             : 'Inicia sesión con tu cuenta de Google para gestionar tu colección.'}
         </p>

         <GoogleLogin
           onSuccess={handleGoogleSuccess}
           onError={() => console.error('Error en login con Google')}
         />

         <button
           type="button"
           onClick={() => setIsLoginOpen(false)}
           className="mt-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer text-sm"
         >
           {language === 'eng' ? 'Cancel' : 'Cancelar'}
         </button>
          </div>
        </div>
      )}
    </>
  );
};
  

export default Navbar;
