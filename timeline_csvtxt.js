var default_vals = [
      [ 'President', 'George Washington', new Date(1789, 3, 30), new Date(1797, 2, 4) ],
      [ 'President', 'John Adams', new Date(1797, 2, 4), new Date(1801, 2, 4) ],
      [ 'President', 'Thomas Jefferson', new Date(1801, 2, 4), new Date(1809, 2, 4) ],
      [ 'Vice President', 'John Adams', new Date(1789, 3, 21), new Date(1797, 2, 4)],
      [ 'Vice President', 'George Clinton', new Date(1805, 2, 4), new Date(1812, 3, 20)],
      [ 'Secretary of State', 'John Jay', new Date(1789, 8, 25), new Date(1790, 2, 22)],
        ];



    var data_array = []
    google.charts.load('current', {'packages':['timeline']});
    google.charts.setOnLoadCallback(drawChart);

      function drawChart(iData=default_vals) {
        var data = new google.visualization.DataTable();

        data.addColumn({ type: 'string', id: 'Position' });
        data.addColumn({ type: 'string', id: 'Name' });
        data.addColumn({ type: 'date', id: 'Start' });
        data.addColumn({ type: 'date', id: 'End' });
        data.addRows(iData);


        // Sets chart options.
        var options = {
          timeline: { showRowLabels: true }
        };

        // Instantiates and draws our chart, passing in some options.
        var chart = new google.visualization.Timeline(document.getElementById('chart_timeline'));
        
        
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
              //console.log(csvArray);
              var output = '';
              for (i=0;i<csvArray.length;i++) 
              {
                if (csvArray[i])
                {
                  var tmp_row = csvArray[i].split(",");
                  if (tmp_row.length>3)
                  {
                    for (var ri=0;ri<4;ri++)
                    {
                      output+=tmp_row[ri]+',';
                    }
                    output+=';';
                  }
                  
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
          var input_splited = input_vals.split(";");
          for (var i=0;i<input_splited.length;i++)
          {
            var row=input_splited[i].split(",");
            if (row.length>3)
            {
              var dates=row[2].split("/");
              var datee=row[3].split("/");
              if ((dates.length>=1) && (datee.length>=1))
              {

                var irow= [row[0],row[1], new Date(row[2]), new Date(row[3])];
                data_array.push(irow);
              };
            }
          }
          if (data_array.length>=1)
          {
            drawChart(data_array);
          }
          else
          {
            alert("No data was loaded");
          }
        });

          
      });