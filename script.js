
//매개변수에 입력한 해당 셀 주소의 값을 데이터 테이블에서 가져오는 함수
//예시: load(1,1)일 경우 A1(아이디 sjs-A1)을 호출함~
var ABCD = ['A','B','C','D'];    
function load(cell,i) {
    console.log(document.getElementById('sjs-'+ABCD[i - 1]+ cell).innerHTML);
}

//table 태그에 table 아이디를 만드는 함수
function makeTableID(){
    document.getElementsByTagName('table')[0].id="table"
    console.log("table 태그에 table 아이디 생성 완료")
}


//몇 줄인지 체크하는 함수 (개발용)
function checkrows() {
    rowNum = document.getElementById('table').rows.length;
    console.log("생성 완료! "+rowNum+"줄입니다.");
}

function checkerror() {
    if (document.getElementsByTagName('table')[0] == undefined) {
        alert("올바른 시트 파일을 첨부해주세요.");
    }
}

//인쇄 창 여는 함수
var openWin;
function openChild() {
    // window.name = "부모창 이름"; 
    window.name = "main";
    // window.open("open할 window", "자식창 이름", "팝업창 옵션");
    openWin = window.open("./print/index.html",
            "print", "width=800, height=600, resizable = no, scrollbars = no");
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

        if (checkerror() != 1) {
            makeTableID();
            openChild();     
        }
    }
}