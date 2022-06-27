import { render } from "react-dom";
import { StrictMode, useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ThemeContext from "./ThemeContext";

// lazy returns a exotic component
const Details = lazy(() => import('./Details'))
const SearchParams = lazy(() => import('./SearchParams'))

const App = () => {
  const theme = useState("darkblue");
  return (
    <StrictMode>
      <Suspense fallback={<h2>loading, be patient please</h2>}>
        <ThemeContext.Provider value={theme}>
          <BrowserRouter>
            <header>
              <Link to="/">Adopt Me!</Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </BrowserRouter>
        </ThemeContext.Provider>
      </Suspense>
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));


// Code splitting is essential to having small application sizes, 
// particularly with React.React is already forty - ish 
// kilobytes just for the framework.This isn't huge but 
// it's enough that it will slow down your initial page 
// loads(by up to a second and a half on 2G speeds.) 
// If you have a lot third party libraries on top of 
// that, you've sunk yourself before they've even 
// started loading your page.

// Enter code splitting.This allows us to identify spots 
// where our code could be split and let Parcel do its 
// magic in splitting things out to be loaded later.
// An easy place to do this would be at the route level.
// So let's try that first.