import React, { Fragment } from "react";

const TagBadge = (props) => {
    const tagarr = props.tagelement.split(",");
    return (
        <Fragment>
            {tagarr && tagarr.map((element)=>{
                return  (
                    <span key={element} className="badge bg-secondary ms-2"  title="Tag" >
                        <i className="bi bi-tag pe-1"></i>
                        {element}
                    </span>
                );
            })}
            
         </Fragment>
    )

}

export default TagBadge;