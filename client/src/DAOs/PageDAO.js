import DAO from "./DAO";

import PageDTO from "../DTOs/PageDTO"

const pageDAO = new DAO('page',PageDTO);

Window.pageDAO = pageDAO;

export default pageDAO;