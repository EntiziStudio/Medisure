var token = localStorage.getItem("token");
async function loadAllSpecialist() {
    var url = 'http://localhost:8080/api/public/allSpecialist'
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listresult = await response.json(); 
    var main = '';
    for(i=0; i< listresult.length; i++){
        main += '<tr>'+
                    '<td>#'+listresult[i].id+'</td>'+
                    '<td>'+listresult[i].name+'</td>'+
                    '<td><button onclick="deleteSpecialist('+listresult[i].id+')" class="btn btn-danger btn_nb"><i class="fa fa-trash"></i> delete</button></td>'+
                    '<td><button onclick="replace('+listresult[i].id+')" class="btn btn-primary btn_nb"><i class="fa fa-edit"></i> update</button></td>'+
                '</tr>'
    }
    document.getElementById("listspecialist").innerHTML = main
    $('#example').DataTable();
}
function replace(id){
    window.location.replace('addspecialist.html?id='+id)
}
async function loadASpecialist() {
    var id = window.location.search.split('=')[1];
    if(id != null){
        var url = 'http://localhost:8080/api/public/getSpecialistById?id='+id;
        const response = await fetch(url, {
            method: 'GET',
            headers: new Headers({
            })
        });
        var specialist = await response.json();
        document.getElementById("idspecialist").value = specialist.id
        document.getElementById("specialistname").value = specialist.name
    }
}

async function addspecialist(){
    var token = localStorage.getItem("token");
    var idspecialist = document.getElementById("idspecialist").value
    var specialistname = document.getElementById("specialistname").value
    var specialist = {
        "id":idspecialist,
        "name":specialistname
    }
    var url = 'http://localhost:8080/api/admin/saveOrUpdateSpecialist';
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json'
         }),
        body:JSON.stringify(specialist)
    });
    if(response.status < 300){
        swal({
            title: "Notification", 
            text: "save or update successful!", 
            type: "success"
          },
        function(){ 
            window.location.replace('specialist.html')
        });
    }
    else{
        swal({
            title: "Notification", 
            text: "save or update error!", 
            type: "error"
          },
        function(){ 
        });
    }
}

async function deleteSpecialist(id){
    var url = 'http://localhost:8080/api/admin/deleteSpecialist?id='+id;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if(response.status < 300){
        swal({
            title: "Notification", 
            text: "delete successful!", 
            type: "success"
            },
        function(){ 
            window.location.reload();
        });
    }
    else{
        swal({
            title: "Notification", 
            text: "can't delete this specialist!", 
            type: "error"
            },
        function(){ 
            window.location.reload();
        });
    }
}
