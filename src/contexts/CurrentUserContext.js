import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react";
  import { useHistory } from "react-router-dom";
  import { axiosReq, axiosRes } from "../api/axiosDefault";
  import axios from "axios";
  import {
    getCookie,
    removeTokenTimestamp,
    shouldRefreshPage,
    shouldRefreshToken,
  } from "../utils/utils";