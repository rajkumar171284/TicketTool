import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
// import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
// import { NgxCsvParser } from 'ngx-csv-parser';
// import { NgxCSVParserError } from 'ngx-csv-parser';
// import { Papa } from 'ngx-papaparse';
import * as XLSX from 'xlsx';

export class CsvData {
  public Number: any;
  public Active: any;
  public AssignedTo: any;
  public AssignmentGroup: any;
  public BusinessDuration: any;
  public ShortDesc: any;
  public Topic: any;
  public SubCatg: any;
  public State: any;
  public Priority: any;
  public Impact: any;
  public Urgency: any;
  public Category: any;
  public Action: any;
  public Caller: any;
  public Class: any;
  public Created: any;
  public CreatedBy: any;
  public Resolved: any;
  public AdditionalAssigneeList: any;
  public ResolvedBy: any;
  public Closed: any;
  public ClosedBy: any;
  public PendingReason: any;
  public IncidentState: any;
  public AssignedDate: any;
  public Vendor: any;
  public ParentRequest: any;
  public Approval: any;
  public ApprovalHistory: any;
  public MajorIncident: any;
  public AffectedRegion: any;
  public BusiResolveTime: any;
  public ConfigItem: any;

  public Channel: any;
  public DaysSinceOpen: any;
  public Location: any;
  public Opened: any;
  public Problem: any;
  public ReassignmentCount: any;
  public ReopenCount: any;
  public TimeWorked: any;
  public Updated: any;
  public SLADue: any;
  public CallerGroup: any;

  public AddiComments: any;
  public CausedByChange: any;
  public ChangeRequest: any;
  public ChildIncident: any;
  public BusinessImpact: any;
  public Pred_catg: any;


}
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  header: boolean = false;

  loader = false;
  public records: any[] = [];
  // @ViewChild('csvReader') csvReader: any;
  jsondatadisplay: any;
  newForm: FormGroup;
  constructor(private fb: FormBuilder, private api: ApiService,
    // private ngxCsvParser: NgxCsvParser
    ) {
    this.newForm = this.fb.group({
      file: [''],

    });
  }

  ngOnInit(): void {
  }
  enableClick() {
    const btnid = document.getElementById("fileID");
    if (btnid) {
      btnid.click();
    }
  }
  csvFile: any;
  //check etension
  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }
  getHeaderArray(csvRecordsArr: any) {
    let headers = (csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }
  onSelectFile1($event: any): void {

    let text = [];
    let files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData: any = reader.result;
        let csvRecordsArray = (csvData).split(/\r\n|\n/);
        console.log(csvRecordsArray)

        let headersRow = this.getHeaderArray(csvRecordsArray);
        console.log(headersRow)

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
        console.log(this.records)
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (csvRecordsArray[i]).split(',');

      if (curruntRecord.length == headerLength) {
        console.log(csvRecordsArray[i])
        // console.log(curruntRecord.length,headerLength)
        let csvRecord: CsvData = new CsvData();
        console.log(curruntRecord[57])
        // csvRecord.id = curruntRecord[0].trim();
        // csvRecord.min = curruntRecord[1].trim();
        // csvRecord.max = curruntRecord[2].trim();
        csvRecord.Pred_catg = curruntRecord[57];
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }
  fileReset() {
    // this.csvReader.nativeElement.value = "";
    this.records = [];
    this.jsondatadisplay = '';
  }
  csvRecords: any;
  onSelectFile(event:any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsBinaryString(file)
    reader.onload = (event: any) => { // called once readAsDataURL is completed
      const binaryData = event.target.result;//working
      const workbook = XLSX.read(binaryData,{
        type:'binary'
      });
      workbook.SheetNames.forEach(sheet=>{
        const sheetValues = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
console.log(sheetValues)
      })


    }
    // Papa.parse(file, {
    //   header: true,
    //   skipEmptyLines: true,
    //   complete: (result,file) => {
    //     console.log(result);
    //     this.dataList = result.data;
    //   }
    // });
  }
//   onSelectFileNgx(event:any){
//     const files = event.srcElement.files;
//     this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',', encoding: 'utf8' })
//     .pipe().subscribe({
//       next: (result): void => {
//         console.log('Result', result);
//         this.csvRecords = result;
//       },
//       error: (error: NgxCSVParserError): void => {
//         console.log('Error', error);
//       }
//     });
// }
  
  onSelectFile2(event: any) {
    if (event.target.files && event.target.files[0]) {

      const file = event.target.files[0];
      console.log('path', file)

      if (file) {
        this.csvFile = file;
        this.api.parseDatafromCSV2(file.name)
        // preview image starts
        const reader = new FileReader();
        reader.onload = (event: any) => { // called once readAsDataURL is completed
          const result = event.target.result.toString();//working
          console.log(result)
          // update on form
          this.newForm.patchValue({
            LOGO: file.name
          })
        }
        reader.readAsDataURL(file); // read file as data url

      } else {
        this.csvFile = null;
      }
    }

  }

  // async loadData(){
  //   let url = 'assets/result.csv';
  //   const data = await (await fetch(url)).arrayBuffer();
  //   /* data is an ArrayBuffer */
  //   const workbook = XLSX.read(data);
  //   const firstSheetName = workbook.SheetNames[0];
  //   const worksheet = workbook.Sheets[firstSheetName];
  //   const sheetValues = XLSX.utils.sheet_to_json(worksheet);

  //   const groupByCategory = sheetValues.reduce((group, product: any) => {


  //   })
  // }
}
