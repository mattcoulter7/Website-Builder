import DAO from "./DAO";

import WebsiteDTO from "../DTOs/WebsiteDTO"

const websiteDAO = new DAO('website',WebsiteDTO);

Window.websiteDAO = websiteDAO;

export default websiteDAO;