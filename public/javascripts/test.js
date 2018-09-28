$ = function () { alert('not jQuery'); };
(function ($,People) {
    $('#test-btn').on('click', function (event) {
        $(event.target).text('按下去了!!~~'+People);
    });
})(jQuery,"Letter");