const body = document.getElementById('urls');

if(!localStorage.getItem('urls')){
    const urls = [
        "*://*.develop/*",
        "*://*.local/*",
        "*://localhost/*"
    ];
    localStorage.setItem('urls', JSON.stringify(urls))
}

const urls = JSON.parse(localStorage.getItem('urls'));
localStorage.setItem('urls', JSON.stringify(urls));

function fetchAll() {
    let data = '';
    if (urls.length > 0) {
        for (let i = 0; i < urls.length; i++) {
            data += '<tr>';
            data += '<td>' + urls[i] + '</td>';
            data += '<td>' + '<button type="button" class="edit" value="' + i + '">Delete</button>' + '</td>';
            data += '</tr>';
        }
    }
    return body.innerHTML = data;
}

fetchAll();

document.getElementById("form-save").addEventListener("click", function () {
    add();
});

function add() {
    var url = document.getElementById('title').value;

    if (url) {
        urls.push(url.trim());
        localStorage.setItem('urls', JSON.stringify(urls));

        url.value = '';

        fetchAll();
    } else {
        alert("The url that you wrote isn't valid.")
    }
}

document.querySelectorAll("button.edit").forEach(b => {
    b.addEventListener("click", function () {
        deleteURL(this.value);
    });
});

function deleteURL(url) {
        urls.splice(url, 1);

        localStorage.setItem('urls', JSON.stringify(urls));

        fetchAll();
        document.location.reload();
}