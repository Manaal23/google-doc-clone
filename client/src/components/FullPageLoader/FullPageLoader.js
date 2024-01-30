import React from "react";
import PageLoaderStyle from "./FullPageLoader.module.css";

function FullPageLoader() {
  return (
    <div className={PageLoaderStyle.parent}>
      <span className={PageLoaderStyle.loader}></span>
    </div>
  );
}

export default FullPageLoader;
