

		
		    
		     var CastObj = {
    		       
    		        settings: {
                                todayAjaxUrl  : "/forecast_weathertoday_ext.cms",
                    		    iconsMap : {
                                               "0" : "tornado",
                                               "1" : "tropicalstrom",
                                               "2" : "hurricane",
                                               "3" : "cloudyheavythundershower",
                                               "4" : "cloudyheavythundershower",
                                               "5" : "raintosnowshowers",
                                               "6" : "rainsleet",
                                               "7" : "wintrymixsnowsleet",
                                               "8" : "freezingdrizzle",
                                               "9" : "cloudylightrain", //for night: overcastlightrain
                                               "10" : "freezingrain",
                                               "11" : "cloudylightrain", // for night: overcastlightrain
                                               "12" : "cloudyrain", // for night: overcastrain
                                               "13" : "cloudysnow", // for night: overcastsnow
                                               "14" : "cloudysnow", // for night : overcastsnow
                                               "15" : "blowingdriftingsnow",
                                               "16" : "cloudysnow", // for night: overcastsnow
                                               "17" : "hail",
                                               "18" : "sleet",
                                               "19" : "partlycloudyduststorm",
                                               "20" : "foggy",
                                               "21" : "hazy",
                                               "22" : "hazy",
                                               "23" : "breezy",
                                               "24" : "blowingspraywindy",
                                               "25" : "frigidicecrystals",
                                               "26" : "cloudy",
                                               "27" : "overcast", // for night: overcast
                                               "28" : "cloudy", // for night: overcast
                                               "29" : "overcast", // night
                                               "30" : "partlycloudy", // day
                                               "31" : "clearsky", // night
                                               "32" : "sunny", // day
                                               "33" : "clearsky",
                                               "34" : "clearsky",
                                               "35" : "mixedrainhail",
                                               "36" : "sunny",
                                               "37" : "cloudymoderatethundershower", // day
                                               "38" : "partlycloudymoderatethundershower",
                                               "39" : "overcastrain",
                                               "40" : "overcastheavyrain",
                                               "41" : "partlycloudysnow",
                                               "42" : "overcastsnow", //night
                                               "43" : "overcastsnow", // night
                                               "44" : "NA",
                                               "45" : "overcastrain",
                                               "46" : "overcastsnow",
                                               "47" : "overcastmoderatethundershower"
                                            },
                                weatherTmpl : $("#weather").html()
                              },
                    
                    currentCityDataModel : {
                       name : 'Delhi',
                       currentUnit : 'C',
        		       todayForecastData : null,
        		       lat : null,
        		       long : null
                    },
                             
    		        init: function(cityName) {
    		            
    		                        if(!cityName && toiprops){
    		                            cityName = toiprops.cookie.get('geolocation')
    		                        }
    		                        CastObj.checkCityFromJson(cityName);
            		       },
            		 
            		checkCityFromJson : function(cityName){
            		        
            		        var cityObj;
            		    
            		        if(cityName && getCityJSON && getCityJSON[CastObj.utils.titleCase(cityName)]){
            		                 CastObj.currentCityDataModel.name = CastObj.utils.titleCase(cityName);
            		                 cityObj = getCityJSON[CastObj.currentCityDataModel.name];
                    		         CastObj.currentCityDataModel.lat = cityObj.lat;
                    		         CastObj.currentCityDataModel.long = cityObj.long;
                    		         CastObj.getCityTemp(cityName);
                    		         
            		         }else{
                    		    
                    		    CastObj.checkCityFromJson(CastObj.currentCityDataModel.name);
                    		    
                    		} 
            	   
            		},
            		    
                    getCityTemp : function(cityName){
                        
            		    CastObj.getCityCurrentData(CastObj.currentCityDataModel.lat,CastObj.currentCityDataModel.long, function(data){
            		        CastObj.currentCityDataModel.todayForecastData = data;
            		        CastObj.populateTodayData(cityName);
                        });
                        
            		  },
                          
                    getCityCurrentData : function(lat,long, callback){
            		       if(lat && long){
            		            $.ajax({
                                        url: CastObj.settings.todayAjaxUrl+'?lat='+lat+'&lng='+long+'&unit=m',
                        				type: 'GET',
                                        dataType: 'json'
                        			}).done(function(data) {
                        			    callback(data);
                        			}).fail(function(data) {
                                        callback(data);
                                        console.error('error in calling weather forecast request');
                                     });
            		       }else{
            		           console.warn('Invalid lat long cordinates');
            		       }
                    },
    		        
    		        populateTodayData : function(cityName){
    		            
    		           var tempObj = CastObj.currentCityDataModel.todayForecastData; 
    		           
    		           if(tempObj.observation){
    		                
    		                var tempData = tempObj.observation;
    		                
    		                var curTemp = tempData.metric.temp,
    		                    curTempF =  CastObj.utils.convertToF(curTemp)
                                iconCode = CastObj.settings.iconsMap[tempData.icon_code] ;
                                
                                var weatherObj ={
                                    tempC: curTemp,
                                    tempF: curTempF,
                                    iconClass : iconCode
                                };
                                
                                if(cityName){
                                    weatherObj['cityName'] = cityName;
                                }
                                
                                var weatherRenderTmpl = $.templates("#weather-new-tmpl");
                                
                                if(weatherRenderTmpl){
                                        $('#weathershow').html(weatherRenderTmpl.render(weatherObj)).show();
                                }
    		           }
    		            
    		        },
    		        
    		        utils : {
                        convertToC : function(value) {
                                var fTempVal = parseFloat(value);
                                var cTempVal = (fTempVal - 32) * (5 / 9);
                                return Math.round(cTempVal);
                            },
                        convertToF: function(value) {
                            var cTempVal = parseFloat(value);
                            var fTempVal = (cTempVal * (9 / 5)) + 32;
                            return Math.round(fTempVal);
                        },
                        titleCase : function (str) {
                               var splitStr = str.toLowerCase().split(' ');
                               for (var i = 0; i < splitStr.length; i++) {
                                   splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
                               }
                               return splitStr.join(' '); 
                            }
    		        }               
    		      };
		


		

		