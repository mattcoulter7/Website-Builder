import DAO from "./DAO";

import ComponentDTO from "../DTOs/ComponentDTO"

const ComponentDAO = new DAO('component', ComponentDTO);

Window.ComponentDAO = ComponentDAO;

export default ComponentDAO;