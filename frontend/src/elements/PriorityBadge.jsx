import React, { Fragment } from "react";
import { taskPriorityColorsClass } from "../style/todo";
import { TaskPriority } from "../constant/todo";


const PriorityBadge = (props) => {

    return (
        <Fragment>
            <span className={`badge ${taskPriorityColorsClass[TaskPriority[props.priority]]} ms-2`} >{TaskPriority[props.priority]}</span>
         </Fragment>
    )

}

export default PriorityBadge;