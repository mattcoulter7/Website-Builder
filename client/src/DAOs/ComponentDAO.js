import DAO from "./DAO";

import ComponentDTO from "../DTOs/ComponentDTO"


const componentDAO = new DAO('component',ComponentDTO);

Window.componentDAO = componentDAO;

export default componentDAO;