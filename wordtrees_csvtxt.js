var data_vals = [
      ['Phrases'],
      ['Bunyavirales Fimoviridae Emaravirus Rose rosette emaravirus'],
      ['Bunyavirales Hantaviridae Orthohantavirus Amga orthohantavirus'],
      ['Bunyavirales Hantaviridae Orthohantavirus Andes orthohantavirus'],
      ['Bunyavirales Hantaviridae Orthohantavirus Asama orthohantavirus'],
      ['Bunyavirales Peribunyaviridae Herbevirus Herbert herbevirus']
    ];

    var root_word = 'Bunyavirales';
    var data_array = []

      //google.charts.load('current', {packages:['wordtree']});
      //google.charts.setOnLoadCallback(drawChart);

      google.charts.load('current', {'packages':['wordtree']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart(iData=data_vals,iRoot=root_word) {
        var data = google.visualization.arrayToDataTable(iData);



        // Sets chart options.
        var options = {
          wordtree: {
            format: 'implicit',
            word: iRoot
          }
        };

        // Instantiates and draws our chart, passing in some options.
        var chart = new google.visualization.WordTree(document.getElementById('wordtree_implicit'));
        chart.draw(data, options);
      }

      $(function(){

        $("#input_csv").change(function(e) 
        {
          data_array = []
          var ext = $("#input_csv").val().split(".").pop().toLowerCase();
          if($.inArray(ext, ["csv"]) == -1) 
          {
            alert('Please Upload CSV');
            return false;
          }    
          if (e.target.files != undefined) 
          {
            var reader = new FileReader();
            reader.onload = function(e) 
            {
              var csvArray=e.target.result.split("\n");
              csvArray.pop();
              var output = '';
              for (i=0;i<csvArray.length;i++) 
              {
                if (csvArray[i])
                {
                  var tmp_row = csvArray[i].split(",");
                  tmp_row=tmp_row.join(" ");
                  data_array.push(tmp_row);
                  output+=tmp_row+';';
                }
              }
              $("#input_string").val(output);
            };
            reader.readAsText(e.target.files.item(0));
            e.target.files = undefined;
          }
          return false;
        });

        $("#proc_data").click(function(){
          console.log("Pressed");
          data_array=[];
          var input_vals = $("#input_string").val();
          data_array.push(data_vals[0]);

          var input_splited = input_vals.split(";");
          root_word=input_splited[0].split(" ")[0];
          for (var i=0;i<input_splited.length;i++)
          {
            data_array.push([input_splited[i]]);
          }

          if (data_array.length>2)
          {
            drawChart(data_array);
          }
          else
          {
            alert("No data was loaded");
          }
        });
      });