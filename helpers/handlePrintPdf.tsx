import jsPDF from 'jspdf';

export const handlePrintPdf = async () => {
  const doc = new jsPDF({
    orientation: 'p',
    format: 'a4',
  });
  doc.setFont('Inter-Regular', 'normal');

  var width = doc.internal.pageSize.getWidth();
  var image = new Image();
  image.src = '/Johanna.jpg';
  for (let i = 1; i <= doc.getNumberOfPages(); i++) {
    doc.setFontSize(9);
    doc.setPage(i);
    doc.text('+46 733 667 869', width / 2, 290, { align: 'center' });
    doc.addImage(image, 'PNG', 65, 4, 50, 50);
    // doc.addImage(image, 'PNG', 70, 7, 25, 10);

    doc.setFont(undefined, 'bold').text('Consultant CV', 22, 10);
    doc.setFont(undefined, 'normal');
    doc.text('Johanna', 22, 15);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(10);
    doc.text('CV', width / 2, 280, { align: 'center' });
    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);
    doc.text('johanna_jonson@hotmail.com', width / 2, 285, {
      align: 'center',
    });

    await doc.save('Johanna_Jonsson' + '.pdf');
  }
};

//   doc.text('+46 733 667 869', width / 2, 290, { align: 'center' });
//   doc.addImage(image, 'PNG', 65, 4, 3, 15);
//   doc.addImage(image, 'PNG', 70, 7, 25, 10);
// }
// await doc.save('Johanna_Jonsson' + '.pdf');
//   },
