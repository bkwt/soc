//for ie can't support indexof    
if(!Array.indexOf)   
{ 
    Array.prototype.indexOf = function(obj) 
    {                
        for(var i=0; i<this.length; i++) 
        { 
            if(this[i]==obj) 
            { 
                return i; 
            } 
        } 
        return -1; 
    } 
} 
//IE trim
String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"");}
//-------------------全局变量----------------
function revokeRule(name,value,rule,owner){
	if(owner == undefined) owner = '_t1';
	if(rule == undefined){
    	rule = name+"='"+value+"'";
    }else{
    	if(value && typeof value == 'object')
    		value =DateUtil.formatDateTime(value);
    	rule = rule.replace('@NAME@', owner + '.' + name);
        rule = rule.replace('@VALUE@', value);
    }
	return rule;
}


var queryLabel = 'border:0px;font-size:12px;text-align:right;';
//css
var panelBodyStyle = 'border:0px;background:eef4ff;';

var indent = 3;
var browser = navigator.appName;
if (browser == 'Internet Explorer')
 {
    indent = 3;


}
 else if (browser == 'Netscape')
 {
    indent = 0;


}
var rowConfig = {
	    layout: 'table',
	    bodyStyle: 'border:0px;padding:3px',
	    border: false

	};

var EMPTY_SITE = 'EMPTY_SITE';

var appPages = {};
//记录app中的page

var appWindows = {};
//记录app中的win

var AppContext = {};

function setAppContext(key, obj)
 {
    AppContext[key] = obj;


}

function getAppContext(key)
 {
    if (AppContext[key])
    {
        return AppContext[key];


    }
    else
    {
        return null;


    }


}

function loadAreaConfig(xmlURL)
{
	if (AppConfig[functionId] != null)
	   {
	       return;


	   }
   if (!xmlURL)
   {
       var xmlURL = '/SOC/view?functionId=' + functionId + '&type=CFGXML';


   }

   var xmlHttp = null;
   try
   {
       xmlHttp = new ActiveXObject('Msxml2.xmlHttp');


   }
   catch(e)
   {
       try
       {
           xmlHttp = new ActiveXObject('Microsoft.xmlHttp');


       }
       catch(e2)
       {
           xmlHttp = null;


       }


   }

   if (!xmlHttp)
   {
       xmlHttp = new XMLHttpRequest();


   }

   xmlHttp.open('POST', xmlURL, false);
   //TODO:url
   xmlHttp.setRequestHeader("Content-Type", "text/xml");
   xmlHttp.onreadystatechange = function() {
       setConfig(xmlHttp);

   };
   xmlHttp.send();


}

function setConfig(xmlHttp)
{

   if (xmlHttp.readyState == 4)
   {
       if (xmlHttp.status == 200)
       {
           var responseXML = xmlHttp.responseXML;
           //if(responseXML.xml)
           {
               //AppConfig = responseXML.getElementsByTagName('AppConfig')[0];
               AppConfig[functionId] = responseXML.getElementsByTagName('AppConfig')[0];
           }


       }
       else if (xmlHttp.status == 404)
       {
           //alert (xmlHttp.status+'  '+xmlURL+' URL is not found.');
           }
       else if (xmlHttp.status == 403)
       {
           alert('Access denied.');


       }
       else
       {
           alert('status is ' + xmlHttp.status);


       }


   }


}
//-----------------------------------------------------------------
function getFieldRanking(functionId, areaID, pageParam)
 {
    if(fieldsRankingBuff)
    {
    	var ranking = fieldsRankingBuff[functionId + '__' + areaID + '__' + pageParam];
        if (ranking)
        {
            return Ext.JSON.decode(ranking);
		}
        else
        {
            return null;
		}
	}
    else
    {
        return null;
	}
}

function saveFieldsRanking(functionId, areaID, pageParam, ranking)
 {
 	var _ranking = Ext.JSON.encode(ranking);
 	
    if (fieldsRankingBuff)
    {
        fieldsRankingService.saveFieldsRankingConfig(functionId, areaID, pageParam, getUserSession().logID, _ranking, 
        {
            callback: function(b)
            {
                Ext.alert(SOC_MESSAGE.rankingSaved);
                fieldsRankingBuff[functionId + '__' + areaID + '__' + pageParam] = _ranking;
			}
            ,
            async: false
		});
	}else
	{
        opener.fieldsRankingService.saveFieldsRankingConfig(functionId, areaID, pageParam, opener.getUserSession().logID, _ranking, 
        {
            callback: function(b)
            {
            }
            ,
            async: false
		});
		Ext.alert(SOC_MESSAGE.rankingSaved);
        opener.fieldsRankingBuff[functionId + '__' + areaID + '__' + pageParam] = _ranking;
	}
}

function resetFieldsRanking(functionId, areaID, pageParam)
 {
    if (fieldsRankingBuff)
    {
        fieldsRankingService.resetFieldsRankingConfig(functionId, areaID, pageParam, getUserSession().logID, 
        {
            callback: function(b)
            {
                Ext.alert(SOC_MESSAGE.rankingReseted);
                fieldsRankingBuff[functionId + '__' + areaID + '__' + pageParam] = null;
			}
            ,
            async: false
		});
	}else
	{
        opener.fieldsRankingService.resetFieldsRankingConfig(functionId, areaID, pageParam, opener.getUserSession().logID, 
        {
            callback: function(b)
            {
            }
            ,
            async: false
		});
		Ext.alert(SOC_MESSAGE.rankingReseted);
        opener.fieldsRankingBuff[functionId + '__' + areaID + '__' + pageParam] = null;
	}
}

//-----------------------pageurl-----------------------------------
var pageURL = null;

function getPageURL()
 {
    return functionId;


}
var functionId;
var functionTitle;
var functionProgParam ;

var AppConfig = {};

var request = 
{
    getParameter: function(val)
    {
        var re = new RegExp("" + val + "=([^&?]*)", "ig");
        return ((functionUrl.match(re)) ? (functionUrl.match(re)[0].substr(val.length + 1)) : null);
    },
    getParameters: function(val)
    {
        var uri = window.location.search;
        var re = new RegExp("" + val + "=([^&?]*)", "ig");
        return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);


    }
};

function pageInit(){
	Ext.get(functionId).dom.innerHTML="<div id='"+functionId+"'></div>";
}

function getUserSession()
{
    if (parent)
    {
        var u = parent.userSession;
        return u;
    }
    else
    {
        return userSession;
    }
}
var SOC_MESSAGE = {
	    rankingSaved: '设置已保存',
	    rankingReseted: '设置已重置,重新进入本模块将使用默认设置',
	    unknowRankingConfig: '系统监测到列配置信息与实际的不符合,请点击\'重置我的设置\'再试',
	    noSelectedRecord: '没有勾选记录',
	    noSignedRecord: '没有选定记录',
	    sessionTimeout: '会话超时,请您重新登陆',
	    msg: '消息',
	    confirm: '确认',
	    input: '填写',
	    fileNotFound: '文件未找到'


	};
Ext.alert = function(msg)
{
   Ext.MessageBox.alert(SOC_MESSAGE.msg, msg);
}
Ext.confirm = function(msg, fn)
{
   Ext.MessageBox.confirm(SOC_MESSAGE.confirm, msg, fn);
}

Ext.prompt = function(msg, fn,flag)
{
	if(flag == undefined)
		flag = false;
    Ext.MessageBox.prompt(SOC_MESSAGE.input, msg, fn,this,flag,"");

}

function alert1(obj)
{   
	var last=JSON.stringify(obj); //将JSON对象转化为JSON字符
	alert(last);

}
function alert2(obj)
{
	return Ext.JSON.encode(obj)
}
var iconPath = 
{
    collapse: '/SOC/org/fdm/images/button/collapse.gif',
    expand: '/SOC/org/fdm/images/button/expand.gif',
    query: '/SOC/org/fdm/images/button/query.gif',
    reset: '/SOC/org/fdm/images/button/reset.gif',
    save: '/SOC/org/fdm/images/button/save.gif',
    clean: '/SOC/org/fdm/images/button/clean.gif',
    set: '/SOC/org/fdm/images/button/set.gif',
	set2: '/SOC/org/fdm/images/button/set2.gif',
	add: '/SOC/org/fdm/images/button/add.gif'
};

var DateUtil = {
	    formatDate: function(date)
	    {
	        return Ext.Date.format(date,'Y-m-d');


	    },
	    formatDateTime: function(date)
	    {
	        return Ext.Date.format(date,'Y-m-d H:i:s');
	    },
	    getToday: function()
	    {
	        return new Date().format('Y-m-d');


	    },
	    getDate: function()
	    {
	        return new Date();


	    }


	};

	var MoneyUtil={
		formatCnMoney:function(nStr)
		{
			nStr += '';   
	        if (nStr.length == 0)   
	        return '';   
	        x = nStr.split('.');   
	        x1 = x[0];
	        x2 = x.length > 1 ? '.' + x[1] : '';   
	        var rgx = /(\d+)(\d{3})/;   
	        while (rgx.test(x1)) {   
	            x1 = x1.replace(rgx,'$1' + ',' + '$2');   
	        }
	        if(x1=='null') return '';
	        return x1 + x2;  
		}
	};

	var StrUtil = {
		replaceAll:function(str,s1,s2){
			return str.replace(new RegExp(s1,"gm"),s2); 
		},
	    displayYN: function(v)
	    {
	        if (v == 'Y')
	        {
	            return '是';


	        }
	        else if (v == 'N')
	        {
	            return '否';


	        }
	        else
	        {
	            return '';


	        }


	    },
	    displayTF: function(v)
	    {
	        if (v == 'T')
	        {
	            return '是';


	        }
	        else if (v == 'F')
	        {
	            return '否';


	        }
	        else
	        {
	            return '';


	        }


	    },
	    displayMF: function(v)
	    {
	        if (v == 'M')
	        {
	            return '男';


	        }
	        else if (v == 'F')
	        {
	            return '女';


	        }
	        else
	        {
	            return '未知';


	        }


	    },
	    convertFieldToConStr: function(f)
	    {
	        if (f == null || f === '')
	        {
	            return '(\'NERVER_BE\')';


	        }
	        else
	        {
	            var array = f.split(',');
	            for (var i = 0; i < array.length; ++i)
	            {
	                array[i] = '\'' + array[i] + '\'';


	            }

	            return '(' + array.join(',') + ')';


	        }


	    },
	    formatNumber: function(v, d)
	    {
	        if (!d)
	        {
	            d = 0;


	        }

	        if (d > 6)
	        {
	            d = 4;


	        }

	        if (!v && v != 0)
	        {
	            return '';


	        }
	        else
	        {
	            var fn = v.toString();

	            var i = fn.indexOf('.');
	            if (i == -1)
	            {
	                if (d > 0)
	                {
	                    fn += '.';
	                    for (var j = 0; j < d; ++j)
	                    {
	                        fn += '0';


	                    }


	                }

	                return fn;


	            }
	            else
	            {
	                var afterDao = fn.substring(i + 1, fn.length).length;
	                if (afterDao > d)
	                {
	                    fn = fn.substring(0, i + d + 1 + (d === 0 ? -1: 0));

	                    return fn;


	                }
	                else
	                {
	                    for (var j = afterDao; j < d; ++j)
	                    {
	                        fn += '0';


	                    }

	                    return fn;


	                }


	            }


	        }


	    },
	    split: function(str, separator)
	    {
	        if (!str || str.trim() === '')
	    	{
	            return 


	        }
	        else
	        {
	            return str.split(separator);


	        }


	    },
	    append:function(str,value,fg)
	    {
	    	return  (str ? str: '') + (fg && str ? fg: '') + value;
            
	    },
	    remove:function(str,value,fg)
	    {
	    	if(str.indexOf(','+value) != -1)
	    		str =  str.replace(','+value,'');
	    	else if(str.indexOf(value+',') != -1)
	    		str =  str.replace(value+',','');
	    	else if(str.indexOf(value) != -1)
	    		str =  str.replace(value,'');
	    	return str;
	    },
	    cjkEncode: function(text)
	    {
	        if (text == null)
	        {
	            return "";


	        }

	        text = text.toString();

	        var newText = "";
	        for (var i = 0; i < text.length; i++)
	        {
	            var code = text.charCodeAt(i);
	            if (code >= 128 || code == 91 || code == 93)
	            {
	                //91 is "[", 93 is "]".   
	                newText += "[" + code.toString(16) + "]";


	            }
	            else
	            {
	                newText += text.charAt(i);


	            }


	        }
	        return newText;


	    },
	    cjkDecode: function(text)
	    {
	        if (text == null)
	        {
	            return "";


	        }
	        //查找没有 "[", 直接返回.
	        if (text.indexOf('[') == -1)
	        {
	            return text;


	        }

	        var newText = "";
	        for (var i = 0; i < text.length; i++)
	        {
	            var ch = text.charAt(i);
	            if (ch == '[')
	            {
	                var rightIdx = text.indexOf(']', i + 1);
	                if (rightIdx > i + 1)
	                {
	                    var subText = text.substring(i + 1, rightIdx);

	                    if (subText.length > 0)
	                    {
	                        ch = String.fromCharCode(eval("0x" + subText));


	                    }
	                    i = rightIdx;


	                }


	            }
	            newText += ch;


	        }
	        return newText;


	    }


	};

	var YNStore = new Ext.data.SimpleStore({
	    fields: ['CH', 'EN'],
	    data: [['是', 'Y'], ['否', 'N']]


	});

	var ArrayUtil = {
	    renameFields: function(list, oldFields, newFields)
	    {
	        if (oldFields instanceof Array)
	        {
	            if (! (newFields instanceof Array))
	            {
	                alert('oldFields is an Array');
	                return;


	            }
	            else if (oldFields.length != newFields.length)
	            {
	                alert('oldFields.length!=newFields.length');
	                return;


	            }
	            else
	            {
	                for (var i = 0; i < list.length; ++i)
	                {
	                    for (var j = 0; j < oldFields.length; ++j)
	                    {
	                        list[i][newFields[j]] = list[i][oldFields[j]];


	                    }


	                }

	                return list;


	            }


	        }
	        else if (typeof(oldFields) == 'string' && typeof(newFields) == 'string')
	        {
	            for (var i = 0; i < list.length; ++i)
	            {
	                list[i][newFields] = list[i][oldFields];


	            }

	            return list;


	        }
	        else
	        {
	            alert('in ArrayUtil:args error');


	        }


	    }


	};

//--------------------选择页工具----------------
function SiteTag(_em)
 {
    var em = _em;

    var xtype = null;

    return {
        getSelectedCount: function()
        {
            if (em)
            xtype = em.getXType();
            else
            return - 1;

            if (xtype == 'editorgrid')
            {
                var sm = em.getSelectionModel();
                if (sm == null)
                {
                    alert('the grid has a null sm');
                    return 0;


                }
                var records = sm.getSelections();

                return records.length;


            }
            else if (xtype == 'panel')
            {
                return 1;


            }


        },
        setField: function(name, value)
        {
            if (em)
            xtype = em.getXType();
            else
            return - 1;
           
            if (xtype == 'editorgrid')
            {
                var sm = em.getSelectionModel();
                var records = sm.getSelections();

                if (records.length > 0)
                {
                    records[0].set(name, value);
                    em.stopEditing();
                    records[0].set(name, value);


                }


            }
            else if (xtype == 'panel')
            {
                var i = 0;

                var tempValue = '';
                if (value != null && typeof value != 'undefined')
                {
                    tempValue = value;


                }
                
                var triggers = em.query('trigger');
                for (i = 0; i < triggers.length; ++i)
                {
                    var key = triggers[i].getName();
                    if (key == name)
                    {
                        triggers[i].setValue(tempValue);

                        if (triggers[i].getValue() != tempValue)
                        {
                            triggers[i].setValue(tempValue);


                        }

                        return;


                    }


                }

                var hiddenFields = em.query('hidden');
                for (i = 0; i < hiddenFields.length; ++i)
                {
                    var key = hiddenFields[i].getName();
                    if (key == name)
                    {
                        hiddenFields[i].setValue(tempValue);

                        if (hiddenFields[i].getValue() != tempValue)
                        {
                            hiddenFields[i].setValue(tempValue);


                        }

                        return;


                    }


                }

                var textFields = em.query('textfield');
                for (i = 0; i < textFields.length; ++i)
                {
                    var key = textFields[i].getName();
                    if (key == name)
                    {
                        textFields[i].setValue(tempValue);

                        if (textFields[i].getValue() != tempValue)
                        {
                            textFields[i].setValue(tempValue);


                        }

                        return;


                    }


                }

                var numberFields = em.query('numberfield');
                for (i = 0; i < numberFields.length; ++i)
                {
                    var key = numberFields[i].getName();
                    if (key == name)
                    {
                        numberFields[i].setValue(tempValue);

                        if (numberFields[i].getValue() != tempValue)
                        {
                            numberFields[i].setValue(tempValue);


                        }

                        return;


                    }


                }

                var dateFields = em.query('datefield');
                for (i = 0; i < dateFields.length; ++i)
                {
                    var key = dateFields[i].getName();
                    if (key == name)
                    {
                        dateFields[i].setValue(tempValue);

                        if (dateFields[i].getValue() != tempValue)
                        {
                            dateFields[i].setValue(tempValue);


                        }

                        return;


                    }


                }

                var combos = em.query('combo');
                for (i = 0; i < combos.length; ++i)
                {
                    var key = combos[i].getName();
                    if (key == name)
                    {
                        combos[i].setValue(tempValue);

                        if (combos[i].getValue() != tempValue)
                        {
                            combos[i].setValue(tempValue);


                        }

                        return;


                    }


                }

                var textAreas = em.query('textarea');
                for (i = 0; i < textAreas.length; ++i)
                {
                    var key = textAreas[i].getName();
                    if (key == name)
                    {
                        textAreas[i].setValue(tempValue);

                        if (textAreas[i].getValue() != tempValue)
                        {
                            textAreas[i].setValue(tempValue);


                        }

                        return;


                    }


                }


            }


        },
        getField: function(name)
        {
            if (em)
            xtype = em.getXType();
            else
            return - 1;

            if (xtype == 'editorgrid')
            {
                alert('can not getField in grid');


            }
            else if (xtype == 'panel')
            {
                var i = 0;

                var textFields = em.query('textfield');
                for (; i < textFields.length; ++i)
                {
                    var key = textFields[i].getName();
                    if (key == name)
                    {
                        return textFields[i].getValue();


                    }


                }

                var hiddenFields = em.query('hidden');
                for (i = 0; i < hiddenFields.length; ++i)
                {
                    var key = hiddenFields[i].getName();
                    if (key == name)
                    {
                        return hiddenFields[i].getValue();


                    }


                }

                var numberFields = em.query('numberfield');
                for (i = 0; i < numberFields.length; ++i)
                {
                    var key = numberFields[i].getName();
                    if (key == name)
                    {
                        return numberFields[i].getValue();


                    }


                }

                var dateFields = em.query('datefield');
                for (i = 0; i < dateFields.length; ++i)
                {
                    var key = dateFields[i].getName();
                    if (key == name)
                    {
                        return dateFields[i].getValue();


                    }


                }

                var combos = em.query('combo');
                for (i = 0; i < combos.length; ++i)
                {
                    var key = combos[i].getName();
                    if (key == name)
                    {
                        return combos[i].getValue();


                    }


                }

                var triggers = em.query('trigger');
                for (i = 0; i < triggers.length; ++i)
                {
                    var key = triggers[i].getName();
                    if (key == name)
                    {
                        return triggers[i].getValue();


                    }


                }

                var textAreas = em.query('textarea');
                for (i = 0; i < textAreas.length; ++i)
                {
                    var key = textAreas[i].getName();
                    if (key == name)
                    {
                        return textAreas[i].getValue();


                    }


                }


            }


        },
        appendField: function(name, value, fg)
        {
            if (em)
            xtype = em.getXType();
            else
            return - 1;

            if (xtype == 'editorgrid')
            {
                var sm = em.getSelectionModel();
                var records = sm.getSelections();

                if (records.length > 0)
                {
                    if (records[0].get(name))
                    {
                        records[0].set(name, (records[0].get(name) ? records[0].get(name) : '') + ((fg && records[0].get(name)) ? fg: '') + value);
                        em.stopEditing();


                    }
                    else
                    {
                        records[0].set(name, value);
                        em.stopEditing();
                        records[0].set(name, value);


                    }


                }
                else
                {
                    alert('no selection record');


                }


            }
            else if (xtype == 'panel')
            {
                var i = 0;

                var tempValue = '';
                if (value != null && typeof value != 'undefined')
                {
                    tempValue = value;


                }

                var textFields = em.query('textfield');
                for (; i < textFields.length; ++i)
                {
                    var key = textFields[i].getName();
                    if (key == name)
                    {
                        textFields[i].setValue(textFields[i].getValue() + ((fg && textFields[i].getValue()) ? fg: '') + tempValue);
                        return;


                    }


                }

                var hiddenFields = em.query('hidden');
                for (i = 0; i < hiddenFields.length; ++i)
                {
                    var key = hiddenFields[i].getName();
                    if (key == name)
                    {
                        hiddenFields[i].setValue(hiddenFields[i].getValue() + ((fg && hiddenFields[i].getValue()) ? fg: '') + tempValue);
                        return;


                    }


                }

                var numberFields = em.query('numberfield');
                for (i = 0; i < numberFields.length; ++i)
                {
                    var key = numberFields[i].getName();
                    if (key == name)
                    {
                        alert('can not append to a numberfield');
                        return;


                    }


                }

                var dateFields = em.query('datefield');
                for (i = 0; i < dateFields.length; ++i)
                {
                    var key = dateFields[i].getName();
                    if (key == name)
                    {
                        alert('can not append to a datefield');
                        return;


                    }


                }

                var combos = em.query('combo');
                for (i = 0; i < combos.length; ++i)
                {
                    var key = combos[i].getName();
                    if (key == name)
                    {
                        alert('can not append to a combo');
                        return;


                    }


                }

                var triggers = em.query('trigger');
                for (i = 0; i < triggers.length; ++i)
                {
                    var key = triggers[i].getName();
                    if (key == name)
                    {
                        triggers[i].setValue(triggers[i].getValue() + ((fg && triggers[i].getValue()) ? fg: '') + tempValue);
                        return;


                    }


                }

                var textAreas = em.query('textarea');
                for (i = 0; i < textAreas.length; ++i)
                {
                    var key = textAreas[i].getName();
                    if (key == name)
                    {
                        textAreas[i].setValue(textAreas[i].getValue() + ((fg && textAreas[i].getValue()) ? fg: '') + tempValue);
                        return;


                    }


                }


            }


        },
        removeField: function(name, value, fg)
        {
            if (em)
            xtype = em.getXType();
            else
            return - 1;

            if (fg === undefined)
            {
                fg = '';


            }


            function removeValue(v, sv, fg)
            {
                if (v)
                {
                    var vArray = v.split(fg);

                    for (var i = vArray.length - 1; i >= 0; --i)
                    {
                        //有\n的字符串split后需要trim一下
                        vArray[i] = vArray[i].trim();
                        if (vArray[i] == sv)
                        {
                            vArray.splice(i, 1);
                            break;


                        }


                    }

                    return vArray.join(fg);


                }
                else
                {
                    alert('fieldValue is null');


                }


            };

            var tempValue = '';
            if (value != null && typeof value != 'undefined')
            {
                tempValue = value;


            }

            if (xtype == 'editorgrid')
            {
                var sm = em.getSelectionModel();
                var records = sm.getSelections();

                for (var i = 0; i < records.length; ++i)
                {
                    //records[i].set(name,(records[i].get(name)?records[i].get(name):'')+((fg&&records[i].get(name))?fg:'')+value);
                    records[i].set(name, removeValue(records[i].get(name), tempValue, fg));


                }


            }
            else if (xtype == 'panel')
            {
                var i = 0;

                var textFields = em.query('textfield');
                for (; i < textFields.length; ++i)
                {
                    var key = textFields[i].getName();
                    if (key == name)
                    {
                        textFields[i].setValue(removeValue(textFields[i].getValue(), tempValue, fg));
                        return;


                    }


                }

                var hiddenFields = em.query('hidden');
                for (i = 0; i < hiddenFields.length; ++i)
                {
                    var key = hiddenFields[i].getName();
                    if (key == name)
                    {
                        hiddenFields[i].setValue(removeValue(hiddenFields[i].getValue(), tempValue, fg));
                        return;


                    }


                }

                var numberFields = em.query('numberfield');
                for (i = 0; i < numberFields.length; ++i)
                {
                    var key = numberFields[i].getName();
                    if (key == name)
                    {
                        alert('can not append to a numberfield');
                        return;


                    }


                }

                var dateFields = em.query('datefield');
                for (i = 0; i < dateFields.length; ++i)
                {
                    var key = dateFields[i].getName();
                    if (key == name)
                    {
                        alert('can not append to a datefield');
                        return;


                    }


                }

                var combos = em.query('combo');
                for (i = 0; i < combos.length; ++i)
                {
                    var key = combos[i].getName();
                    if (key == name)
                    {
                        alert('can not append to a combo');
                        return;


                    }


                }

                var triggers = em.query('trigger');
                for (i = 0; i < triggers.length; ++i)
                {
                    var key = triggers[i].getName();
                    if (key == name)
                    {
                        triggers[i].setValue(removeValue(triggers[i].getValue(), tempValue, fg));
                        return;


                    }


                }

                var textAreas = em.query('textarea');
                for (i = 0; i < textAreas.length; ++i)
                {
                    var key = textAreas[i].getName();
                    if (key == name)
                    {
                        textAreas[i].setValue(removeValue(textAreas[i].getValue(), tempValue, fg));
                        return;


                    }


                }


            }


        }


    };


}

var wdrService = [];
var selectService = [];
var url = null;
function require(service)
{
	for(var i=0;i<wdrService.length;i++){
		if(wdrService[i] == service)
			return;
	}
	wdrService.push(service);
	url = '/SOC/dwr/interface/'+service+'.js';
	Ext.Ajax.request({
	    url: url,
	    method: 'GET',
	    async : false,

	    success: function (response, options) {
	    	eval(response.responseText);
	    },
	    failure: function (response, options) {
	        Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
	    }
	});
}
function include(service){ 
	for(var i=0;i<selectService.length;i++){
		if(selectService[i] == service)
			return;
	}
	selectService.push(service);
	if(service.indexOf('.') == -1)
		path='/SOC/view?functionId='+service;
	else
		path=service;
    var a=document.createElement("script");
     a.type = "text/javascript"; 
    a.src=path; 
    var head=document.getElementsByTagName("head")[0];
    head.appendChild(a);
}
 

//Ext.suspendLayouts();
//Ext.resumeLayouts(true); 