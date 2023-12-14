import PreviewView from "./previewView";

class ResultsView extends PreviewView {

    _parentEl = document.querySelector(".results");
    _errorMsg = "No recipe found! Please retry"

}

export default new ResultsView();