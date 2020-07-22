function carregaClusterInfo(){

    fetch("http://localhost:8080/api/clusterinfo")
        .then(res => res.json())
        .then(res => preencheClusterInfo(res));

        carregaKeyspaces();

}

function preencheClusterInfo(json){

    var contSTR = ""

    for (i=0; i<json.length; i++){
        var cluster = json[i];
        contSTR = contSTR + "Cluster Name: " + cluster.cluster_name + "<br>"
        contSTR = contSTR + "DSE Version: " + cluster.dse_version + "<br>"
        contSTR = contSTR + "Datacenter: " + cluster.data_center + "<br>"
        document.getElementById("cluster").innerHTML = contSTR;
    }
        
}

function carregaKeyspaces(){

    fetch("http://localhost:8080/api/keyspaces")
        .then(res => res.json())
        .then(res => preencheKeyspaces(res));
}

function preencheKeyspaces(resJson){
    
    var contSTR = ""

    for (i=0; i<resJson.length; i++){
        var keyspaces = resJson[i];


            contSTR = contSTR + keyspaces.keyspace_name + "<br>";


        document.getElementById("keyspaces").innerHTML = contSTR;
    }

    var contSTR = ""

    for (i=0; i<resJson.length; i++){
        var keyspaces = resJson[i];

        contSTR = contSTR + keyspaces.replication.class + "<br>";
        document.getElementById("keyspaceStrategy").innerHTML = contSTR;
    }

    var contSTR = ""

    for (i=0; i<resJson.length; i++){
        var keyspaces = resJson[i];

        if(keyspaces.replication.class == "org.apache.cassandra.locator.SimpleStrategy"){
            contSTR = contSTR + keyspaces.replication.replication_factor + "<br>"
            document.getElementById("rplFactor").innerHTML = contSTR;
        } else if (keyspaces.replication.class == "org.apache.cassandra.locator.LocalStrategy" || keyspaces.replication.class == "org.apache.cassandra.locator.EverywhereStrategy") {
            contSTR = contSTR + "Not Apply" + "<br>"
            document.getElementById("rplFactor").innerHTML = contSTR;
        } else {
            contSTR = contSTR + keyspaces.replication.Cassandra + "<br>"
            document.getElementById("rplFactor").innerHTML = contSTR;
        }

        
    }
}

