//매개변수에 입력한 해당 셀 주소의 값을 데이터 테이블에서 가져오는 함수
//예시: load(1,1)일 경우 A1(아이디 sjs-A1)을 호출함~
var ABCD = ['A', 'B', 'C', 'D'];

function load(cell, i) {
	console.log(document.getElementById('sjs-' + ABCD[i - 1] + cell).innerHTML);
}
//table 태그에 table 아이디를 만드는 함수 (calcEmpty로 대체되어 이제 안 씀)
function makeTableID() {
	document.getElementsByTagName('table')[0].id = "table";
	console.log("table 태그에 table 아이디 생성 완료")
}
//실제 데이터가 몇 줄인지 체크하는 함수
function calcEmpty() {
	sheet_row = document.getElementsByTagName('table')[0].rows.length;
	for (data_row = sheet_row; data_row > 1; data_row--) {
		if (document.getElementById("sjs-A" + data_row).innerHTML != "") {
			break;
		}
	}
	console.log("이 시트의 데이터는 " + data_row + "행까지 있습니다.");
}
//불러온 시트를 수정할 수 있게 만드는 함수
function sheet_modify() {
	sheet_row = document.getElementsByTagName('table')[0].rows.length;
	for (row = 1; row <= sheet_row; row++) {
		document.getElementById("sjs-A" + row).setAttribute('contenteditable', 'true');
		document.getElementById("sjs-A" + row).setAttribute('class', 'write-mode');
		document.getElementById("sjs-B" + row).setAttribute('contenteditable', 'true');
		document.getElementById("sjs-B" + row).setAttribute('class', 'write-mode');
		document.getElementById("sjs-C" + row).setAttribute('contenteditable', 'true');
		document.getElementById("sjs-C" + row).setAttribute('class', 'write-mode');
	}
}

function no_data_check() {
	if (document.getElementsByTagName('table')[0] == undefined) {
		alert("올바른 시트 파일을 첨부해주세요.");
	}
}

function firstrow_color() {
	document.getElementsByTagName('tr')[0].id = "firsttr";
}
//인쇄 창 여는 함수
var openWin;

function openChild() {
	window.name = "main";
	openWin = window.open("./print/index.html", "print", "width=800, height=600, resizable = no, scrollbars = no");
}
//인쇄
function printLabel() {
	if (document.getElementsByTagName('table')[0] == undefined) {
		alert("올바른 시트 파일을 첨부해주세요.");
	} else {
		// 체크값을 변수로
		chk1 = document.getElementById("firstrow").checked;
		chk2 = document.getElementById("savelabel").checked;
		chk3 = document.getElementById("sender").checked;
		dear = document.getElementById("dear").checked;
		// 라벨 절약 모드
		if (document.getElementById("savelabel").checked == true) {
			emptyLabel = document.getElementById("emptyLabel").value;
		}
		// 보내는 사람 출력
		if (document.getElementById("sender").checked == true) {
			senderName = document.getElementById("tName").value;
			senderAddress = document.getElementById("tAddress").value;
			senderPhone = document.getElementById("tPhone").value;
		}
		if (no_data_check() != 1) {
			//makeTableID();
			calcEmpty();
			openChild();
		}
	}
}