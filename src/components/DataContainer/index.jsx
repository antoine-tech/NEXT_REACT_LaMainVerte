import React from 'react';


const DataContainer = ({icon:Icon, dataText}) =>
{
    return (

        <div className="data-container">
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