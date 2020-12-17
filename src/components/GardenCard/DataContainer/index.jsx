import React from 'react';


const DataContainer = ({icon:Icon, dataText}) =>
{
    return (

        <div className="data-container hover-animate-bounce">
        <div className="icon-data">
            <Icon/>
        </div>
        <span className="data">
            {dataText}
        </span>
      </div>

    )
}

export default DataContainer