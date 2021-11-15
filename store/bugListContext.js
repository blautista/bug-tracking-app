import React, {useContext, useState} from 'react';

const BugListContext = React.createContext({
    bugsArray: [],
    filteredBugsArray: [],
    filterBugs: (filterTerm) => {},
    overwriteBugs: (newBugs) => {} 
});

export const BugListContextProvider = (props) => {

    const [filteredBugs, setFilteredBugs] = useState();
    const [bugs, setBugs] = useState(); 

    const overwriteBugsHandler = (newBugs) => {
        setFilteredBugs([...newBugs]);
        setBugs([...newBugs]);
    }
    
    const filterBugsHandler = (filterTerm) => {
        if (typeof(filterTerm) === String) {
            setFilteredBugs(bugs.filter((bug) => {
                return bug.name.toLowerCase().includes(filterTerm.toLowerCase())
            }));
        } else {
            setFilteredBugs([...bugs]);
        }
    }

    return (
        <BugListContext.Provider
            value={{
                bugsArray: bugs,
                filteredBugsArray: filteredBugs,
                filterBugs: filterBugsHandler,
                overwriteBugs: overwriteBugsHandler
            }}>
            {props.children}
        </BugListContext.Provider>
    )
}


export default BugListContext;