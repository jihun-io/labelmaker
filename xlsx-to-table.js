function excelExport(event){
    excelExportCommon(event, handleExcelDataAll);
}
function excelExportCommon(event, callback){
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
        var fileData = reader.result;
        var wb = XLSX.read(fileData, {type : 'binary'});
        var sheetNameList = wb.SheetNames; // 시트 이름 목록 가져오기 
        var firstSheetName = sheetNameList[0]; // 첫번째 시트명
        var firstSheet = wb.Sheets[firstSheetName]; // 첫번째 시트 
        callback(firstSheet);      
    };
    reader.readAsBinaryString(input.files[0]);
}
function handleExcelDataAll(sheet){
    handleExcelDataHtml(sheet); // html 형태
}
function handleExcelDataHeader(sheet){
    var headers = get_header_row(sheet);
    $("#displayHeaders").html(JSON.stringify(headers));
}
function handleExcelDataJson(sheet){
    $("#displayExcelJson").html(JSON.stringify(XLSX.utils.sheet_to_json (sheet)));
}
function handleExcelDataCsv(sheet){
    $("#displayExcelCsv").html(XLSX.utils.sheet_to_csv (sheet));
}
function handleExcelDataHtml(sheet){
    $("#displayExcelHtml").html(XLSX.utils.sheet_to_html (sheet));
}

function get_header_row(sheet) {
    var headers = [];
    var range = XLSX.utils.decode_range(sheet['!ref']);
    var C, R = range.s.r; /* start in the first row */
    /* walk every column in the range */
    for(C = range.s.c; C <= range.e.c; ++C) {
        var cell = sheet[XLSX.utils.encode_cell({c:C, r:R})] /* find the cell in the first row */

        var hdr = "UNKNOWN " + C; // <-- replace with your desired default 
        if(cell && cell.t) hdr = XLSX.utils.format_cell(cell);

        headers.push(hdr);
    }
    return headers;
} 
    
//</script > <script>
    
  var sheet_to_row_array = function(workbook, opts) {
  var result = [], y = "", x, val=""; 
  var worksheetName = workbook.SheetNames[0];
  var worksheet = workbook.Sheets[worksheetName];
  var o = opts === null ? {} : opts;
  if(worksheet === null || worksheet["!ref"] === null)  return [];
  var r = safe_decode_range(worksheet['!ref']);
  var rr = "", cols = [], C;
  result = new Array(r.e.r - r.s.r + 1);
  for(C = r.s.c; C <= r.e.c; ++C) cols[C] = XLSX.utils.encode_col(C);
  var row = 0;
  var col = 0;
  var R = 0; 
  for(R = r.s.r; R <= r.e.r; ++R) {
    rr = XLSX.utils.encode_row(R);
    result[row] =  new Array(r.e.c - r.s.c + 1);
    for(C = r.s.c; C <= r.e.c; ++C) {
      y = cols[C] + rr;
      x = worksheet[y];
      val = "";
      if (x === undefined) val = null;
      else if(x.f !== null) val = x.w;
      else if (x.v === undefined ) val = null;
      else val = "" + x.v;
      result[row][col++] = val;       
    }
    row++;
    col = 0;
  } 
  return result;
};