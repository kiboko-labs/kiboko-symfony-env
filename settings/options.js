const body = document.getElementById('urls');

const urls = JSON.parse(localStorage.getItem('urls'));
localStorage.setItem('urls', JSON.stringify(urls));

function fetchAll() {
    let data = '';
    if (urls.length > 0) {
        for (let i = 0; i < urls.length; i++) {
            data += '<tr>';
            data += '<td>' + urls[i] + '</td>';
            data += '<td>' + '<button type="button" class="edit btn btn-danger" value="' + i + '">Delete</button>' + '</td>';
            data += '</tr>';
        }
    }
    return body.innerHTML = data;
}

fetchAll();

document.getElementById("form-save").addEventListener("click", function (e) {
    add();
    //e.preventDefault();
});

function add() {
    var url = document.getElementById('title').value;
    //console.log(url)

    if (url) {
        // Add the new value
        urls.push(url.trim());
        localStorage.setItem('urls', JSON.stringify(urls));
        //console.log(localStorage.getItem('urls'))
        //let name = localStorage.getItem('url');
        // Reset input value
        url.value = '';
        // Dislay the new list
        fetchAll();
    } else {
        alert("The url that you wrote isn't valid.")
    }
}

/* Ne peut pas utiliser cette fonction car bloque l'url de type *://*.develop/*
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}*/

document.querySelectorAll("button.edit").forEach(b => {
    b.addEventListener("click", function () {
        deleteURL(this.value);
    });
});

function deleteURL(url) {
    if (confirm("Confirm url delete ? ")) {
        // Delete the current row
        urls.splice(url, 1);
        //on met a jour le tableau stocké dans localStorage
        localStorage.setItem('urls', JSON.stringify(urls));
        // Display the new list
        fetchAll();
        document.location.reload();
    }
}