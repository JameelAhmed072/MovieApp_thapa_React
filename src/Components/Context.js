// context <API
// use Context 



// these two are different from each other


// useContext(warehouse)------> making is very easy
// provider(delivery-Boy)-----> making is very easy    

// consumer(UseContext(you))   -------> Making is very lengthy, so for that useContext is introduced
// --------------------------------------------------------------------------------------------------------------------
import React, { useContext, useEffect,useState } from "react";

const API_URL = `http://www.omdbapi.com/?apikey=9e214808`;

// '9e214808'   API key which is got from the website through email

const AppContext = React.createContext();

// we need to create a provider funtion
const AppProvider = ({children}) =>{
    const [isLoading,setIsLoading] = useState(true);
    const [movie,setMovie] = useState([]);
    const [isError,setIsError] = useState({show:"false", msg:""});
    const [query, setQuery] = useState('titanic');

    const getMovies = async(url)=>{
        try{
            const res = await fetch(url);
            const data = await  res.json();
            console.log(data);

            if (data.Response === 'True'){
                setIsLoading(false)
                setMovie(data.Search);
            }
            else{
                setIsError({
                    show:true,
                    msg:data.error,
                })
            }
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() =>{
        getMovies(`${API_URL}&s=${query}`); 
    },[query])

    return <AppContext.Provider value={{isLoading,isError,movie,query, setQuery}}>
        {children} 
    </AppContext.Provider>
};

// if we use useGlobalContext then we can reduce the written code whereever we need the context/data

// global custom hooks
const useGlobalContext = ()=>{
    return useContext(AppContext);
}


export {AppContext,AppProvider,useGlobalContext};