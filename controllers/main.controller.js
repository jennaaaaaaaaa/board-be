const MainService = require("../services/main.service");

class MainController {
  mainService = new MainService();

  findAllArticles = async (req, res) => {
    const articles = await this.mainService.findAllArticles();
    res.json({ articles });
  };


}

module.exports = MainController;
