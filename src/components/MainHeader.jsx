import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "@/utils/userSlice";
import { LANGUAGES, LOGO_URL } from "@/utils/constants";
import { removeGptSearchView, toggleGptSearchView } from "@/utils/gptSlice";
import { changeLanguage } from "@/utils/configSlice";
import lang from "@/utils/languageConstants";

const MainHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const language = useSelector((store) => store.config?.lang);
  const user = useSelector((store) => store.user);
  const currentlang = useSelector((store) => store.config?.lang);
  const translations = lang[currentlang] || lang.En;

  const handleGptClick = () => {
    dispatch(toggleGptSearchView());
  };
  const handleHomeClick = () => {
    dispatch(removeGptSearchView());
  };
  const handleLanguage = (lang) => {
    dispatch(changeLanguage(lang));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
      return () => unsubscribe();
    });
  }, [dispatch, navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <div className="flex justify-between w-full bg-black bg-opacity-90 px-4 sm:px-10 py-2 text-white items-center z-10">
      <div className="flex items-center gap-6 sm:gap-8">
        <NavLink onClick={handleHomeClick} to={"/browse"}>
          <img className="w-20 sm:w-28" src={LOGO_URL} alt="logo" />
        </NavLink>
        <NavLink
          onClick={handleHomeClick}
          to={"/browse"}
          className="hidden sm:block"
        >
          {translations.homeBtn}
        </NavLink>
        {/* <h1 className="hidden sm:block">My List</h1> */}
        <h1
          className="cursor-pointer text-xs md:text-base  sm:block"
          onClick={handleGptClick}
        >
          {translations.geminiBtn}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <img
          className="rounded-lg w-8 sm:w-10 h-8 sm:h-10"
          src={user?.photoURL}
          alt=""
        />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <h1 className="text-sm md:text-lg">{language}</h1>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {LANGUAGES.map((lang) => (
              <div key={lang.identifier}>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <h1
                    className=" font-semibold"
                    onClick={() => handleLanguage(lang.identifier)}
                  >
                    {lang.name}
                  </h1>
                </DropdownMenuItem>
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <i className="text-white ri-arrow-down-s-fill"></i>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{translations.myAccount}</DropdownMenuLabel>
            <DropdownMenuItem>
              <h1>{user?.displayName}</h1>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button className="font-semibold" onClick={handleSignOut}>
                {translations.signOut}
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default MainHeader;
