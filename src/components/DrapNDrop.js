import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";

const DrapNDrop = ({ data }) => {
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();

  const handleDragStart = (e, params) => {
    console.log("drag start", params);
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (e, params) => {
    console.log("enter here", params);
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[params.grpI].items.splice(
          params.itemI,
          0,
          newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0]
        );
        dragItem.current = params;
        return newList;
      });
    }
    console.log(list);
  };

  const handleDragEnd = () => {
    console.log("ending drag");

    setDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  const getStyle = (params) => {
    const currentItem = dragItem.current;
    if (
      currentItem.grpI === params.grpI &&
      currentItem.itemI === params.itemI
    ) {
      return "current dnd-item";
    }
    return "dnd-item";
  };

  return (
    <div>
      <div className="drag-n-drop">
        {list.map((grp, grpI) => {
          return (
            <div
              key={grp.title}
              className="dnd-group"
              onDragEnter={
                dragging && !grp.items.length
                  ? (e) => {
                      handleDragEnter(e, { grpI, itemI: 0 });
                    }
                  : null
              }
            >
              <div className="group-title">{grp.title}</div>
              {grp.items.map((item, itemI) => {
                return (
                  <div
                    draggable
                    key={item}
                    onDragStart={(e) => handleDragStart(e, { grpI, itemI })}
                    onDragEnter={
                      dragging
                        ? (e) => {
                            handleDragEnter(e, { grpI, itemI });
                          }
                        : null
                    }
                    onClick={(e) => alert("hehe")}
                    className={
                      dragging ? getStyle({ grpI, itemI }) : "dnd-item"
                    }
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div>flkdafhsdlkhfjasd</div>
      <Button>Submit</Button>
    </div>
  );
};

export default DrapNDrop;
