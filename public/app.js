function getChortles() {
  $.ajax({
    type: "GET",
    url: "/api/chortles/",
  }).then((chortles) => displayChortles(chortles));
}

function displayChortles(chortles) {
    $('#chortles').empty();
  chortles.forEach((chortle) => {
    $("#chortles").append(`
        <div className="col-md-8">
            <div className="card my-2 shadow">
                <div className="card-header">
                    <p className="header-text">@${chortle.username}</p>
                </div>
                <div className="card-body">
                    <p className="card-text">${chortle.mewsing}</p>
                    <div class="d-flex justify-content-between">
                        <button onclick="editChortle('${chortle.id}', '${chortle.username}', '${chortle.mewsing}' )" class="btn btn-outline-info">Edit</button>
                        <button onclick="deleteChortle(${chortle.id})" class="btn btn-outline-danger">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        `);
  });
}

getChortles();
displayChortles();

function deleteChortle(id) {
    $.ajax({
        type: 'DELETE',
        url: `/api/chortles/destroy/${id}`
    })
    .then(resp => {
        console.log(resp.msg)
        getChortles();
    })
    .catch(e => console.log(e));
}

function editChortle(id, username, mewsing) {
    Swal.fire({
        title: 'Edit Chortle' + id,
        input: 'text',
        inputValue: mewsing, 
        showCancelButton: true,
        confirmButtonText: 'Save Changes',
        showLoaderOnConfirm: true,
        preConfirm: (editedMessage) => {
            $.ajax({
                type: 'PUT', 
                url: `/api/chortles/edit/${id}`,
                data: {
                    username, 
                    mewsing: editedMessage
                }
            })
            .then((resp) => {
                console.log(resp.msg); 
                getChortles();
                return resp
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.msg) {
          Swal.fire( 'Chortle Changed' );
        }
      })
}


