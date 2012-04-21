format_number = function(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

shuffle = function(array) {
    var tmp, current, top = array.length;

    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }

    return array;
};

newCard = function(req){
  var session = req.session;
  new_sites = websites.filter(function(v) {
    return (v.url.match(/gov\.uk/) !== null
      && v.cost > 0
      && session.cardsPlayed.indexOf(v) == -1
      && v.url.match(/\//) == null)
  });
  randomCard = shuffle(new_sites)[0];
  req.session.cardsPlayed.push(randomCard);
};