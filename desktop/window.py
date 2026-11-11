import webview

from config.settings import (
    WINDOW_TITLE,
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
    WINDOW_MIN_WIDTH,
    WINDOW_MIN_HEIGHT,
    WINDOW_ON_TOP,
    WINDOW_RESIZABLE
)


def criar_janela(url):

    janela = webview.create_window(
        title=WINDOW_TITLE,
        url=url,

        width=WINDOW_WIDTH,
        height=WINDOW_HEIGHT,

        min_size=(
            WINDOW_MIN_WIDTH,
            WINDOW_MIN_HEIGHT
        ),

        on_top=WINDOW_ON_TOP,
        resizable=WINDOW_RESIZABLE
    )

    return janela