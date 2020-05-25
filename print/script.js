// 부모 창에서 데이터 값을 불러오는 함수
var ABCD = ['A', 'B', 'C', 'D'];

function load(cell, i) {
	try {
		return opener.document.getElementById('sjs-' + ABCD[i - 1] + cell).innerHTML;
	} catch(err) {
		return ""
	}
}
//라벨 추가 및 수정하는 함수
function addData(num, addressTXT, nameTXT, zipTXT, dear) {
	document.getElementById('address' + num).innerHTML = addressTXT;
	document.getElementById('zip' + num).innerHTML = zipTXT;
	if (dear == 1) {
		document.getElementById('name' + num).innerHTML = nameTXT + ' 귀하';
	} else {
		document.getElementById('name' + num).innerHTML = nameTXT;
	}
	return (num + '번째 라벨 수정 완료!')
}

function delData(num) {
	document.getElementById('address' + num).innerHTML = "";
	document.getElementById('name' + num).innerHTML = "";
	document.getElementById('zip' + num).innerHTML = "";
	return (num + '번째 라벨이 삭제되었습니다.')
}
//JQuery를 이용한 레이블 반복 생성 코드
$(function() {
	j = 1;
	// labelNums 값은 레이블의 개수입니다. 부모 창에서의 테이블 줄 수를 가져옵니다. 
	// 만약 부모 창에서 '첫 열 출력하기'가 체크되어 있지 않다면 값에서 1을 뺍니다.
	if (opener.window.chk1 == true) {
		labelNums = opener.window.data_row;
	} else {
		labelNums = opener.window.data_row - 1;
	}
	// 만약 보내는 사람 주소 출력이 체크되어 있다면 값에 2를 곱합니다.
	if (opener.window.chk3 == true) {
		labelNums = labelNums * 2;
	}
	// 공백 라벨 수만큼 총 레이블 수를 더합니다.
	if (opener.window.chk2 == true) {
		emptyLabel = parseInt(opener.window.emptyLabel);
		labelNums = labelNums + parseInt(opener.window.emptyLabel);
	} else {
		emptyLabel = 0;
	}
	// 페이지 수를 구하는 조건문
	if (labelNums % 16 == 0) {
		page = parseInt(labelNums / 16);
	} else {
		page = parseInt(labelNums / 16) + 1;
	}
	if (opener.window.chk2 == true) {
		console.log('공백 라벨의 개수: ' + parseInt(opener.window.emptyLabel))
		console.log('라벨 개수: ' + parseInt(labelNums - opener.window.emptyLabel))
	} else {
		console.log('라벨 개수: ' + labelNums)
	}
	console.log('총 라벨 개수: ' + labelNums)
	console.log('총 페이지 수: ' + page)
	//페이지 단위로 생성하는 코드
	for (pageCount = 1; pageCount <= page; pageCount++) {
		$("#begin").append('<div id="page' + pageCount + '" class="page"><div class="header" id="header' + pageCount + '"></div><div class="main" id="main' + pageCount + '">');
		// 줄 개수 구하는 조건문... 페이지가 남아있으면 8줄, 남아있지 않으면 나머지 줄을 띄움.
		if (pageCount < page) {
			row = 8;
		} else {
			if (labelNums % 2 == 0) {
				row = parseInt(labelNums / 2) - (page - 1) * 8
			} else {
				row = parseInt(labelNums / 2) + 1 - (page - 1) * 8;
			}
		}
		console.log(pageCount + '페이지가 생성되었습니다.');
		// ***** 라벨 열 단위로 생성하는 코드 *****
		for (i = 1; i <= row; i++) {
			//좌측 생성
			$("#main" + pageCount).append('<div class="label line left" id="left' + j + '"><div class="text"><p class="address" id="address' + j + '"></p><p class="name" id="name' + j + '"></p><p class="zip" id="zip' + j + '"></p></div>');
			//여백 생성하고 카운트 1을 더함
			$("#main" + pageCount).append('<div class="mid_margin" id="mid_margin' + j + '"></div>');
			j = j + 1
			//우측 생성
			if (j <= labelNums) {
				$("#main" + pageCount).append('<div class="label line" id="right' + j + '"><div class="text"><p class="address" id="address' + j + '"></p><p class="name" id="name' + j + '"></p><p class="zip" id="zip' + j + '"></p></div>');
				j = j + 1
			}
		}
		$("#page" + pageCount).append('</div><div class="footer" id="footer' + pageCount + '"></div>');
		console.log(pageCount + '페이지에서 ' + (j - 1) + '개의 라벨이 생성되었습니다.');
	}
	console.log("라벨 생성 완료!\n총 " + (pageCount - 1) + "페이지 / 라벨 " + (j - 1) + "개\n\n라벨 편집 방법: addData(라벨번호,주소,이름,우편번호,[귀하 유무]);");
	//부모 창의 데이터대로 라벨의 내용을 바꿔주는 코드
	//첫열 출력 모드가 true일 경우 시작 열을 1로 설정, false일 경우 시작 열을 2로 설정
	if (opener.window.chk1 == true) {
		adcStart = 1;
		firstrowMode = 0;
	} else {
		adcStart = 2;
		labelNums = labelNums + 1;
		firstrowMode = 1;
	}
	// 공백 라벨 출력 모드가 켜져있을 경우 공백 라벨만큼 labelNums에 값을 뺌
	if (opener.window.chk2 == true) {
		labelNums = labelNums - parseInt(opener.window.emptyLabel);
	}
	//보내는 사람 주소 출력 모드일 경우 레이블 출력 수를 2로 나눔
	if (opener.window.chk3 == true) {
		sendDivide = 2;
		sendmode = parseInt(1 - opener.window.chk1);
	} else {
		sendDivide = 1;
		sendmode = 0;
	}
	for (addCount = adcStart; addCount <= (labelNums / sendDivide) + sendmode; addCount++) {
		//보내는 사람 주소 출력 모드일 경우 좌측 레이블의 내용을 모두 보내는 사람 주소로 채움
		if (opener.window.chk3 == true) {
			addNumber = parseInt((addCount - firstrowMode) * 2) + emptyLabel;
			addData(addNumber - 1, opener.window.senderAddress, opener.window.senderName, opener.window.senderPhone);
		} else {
			addNumber = (addCount - firstrowMode) + emptyLabel;
		}
		//부모 창의 데이터를 불러와서 출력
		addData(addNumber, load(addCount, 2), load(addCount, 1), load(addCount, 3), opener.window.dear);
	}
	print();
});