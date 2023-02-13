const { Article } = require("../models");
const MainRepository = require("../repositorys/main.repository")

class MainService {
  mainRepository = new MainRepository(Article)

  findAllArticles = async () => {
    return this.mainRepository.findAllArticles()
  }

  
}

module.exports = MainService