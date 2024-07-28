window.onload = function () {
    window.scrollTo(0, 0);

    console.log('Page loaded');
    console.log(document.getElementById('rank-list')); // 확인

    const rankList = [
        { name: '가1', rateOfReturn: '+10%', evalPrice: '100,000원' },
        { name: '가2', rateOfReturn: '+10%', evalPrice: '100,000원' },
        { name: '가3', rateOfReturn: '+10%', evalPrice: '100,000원' },
        { name: '가4', rateOfReturn: '+10%', evalPrice: '100,000원' },
        { name: '가5', rateOfReturn: '+10%', evalPrice: '100,000원' },
        { name: '가6', rateOfReturn: '+10%', evalPrice: '100,000원' },
        { name: '가7', rateOfReturn: '+10%', evalPrice: '100,000원' },
        { name: '가8', rateOfReturn: '+10%', evalPrice: '100,000원' },
        { name: '가9', rateOfReturn: '+10%', evalPrice: '100,000원' },
        { name: '가10', rateOfReturn: '+10%', evalPrice: '100,000원' },
        { name: '가11', rateOfReturn: '+10%', evalPrice: '100,000원' },
    ];

 
    const rankListElement = document.getElementById('rank-list');


    rankList.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.rateOfReturn}</td>
            <td>${user.evalPrice}</td>
        `;
        rankListElement.appendChild(row);
    });


};