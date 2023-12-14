import PreviewView from "./previewView";

class BookmarkView extends PreviewView {

    _parentEl = document.querySelector(".bookmarks__list");
    _errorMsg = "No bookmarks yet. Find a nice recipe and bookmark it :)"

    addHandlerLoadBookmarks(handler) {
        window.addEventListener('load', handler);
    }
}

export default new BookmarkView();