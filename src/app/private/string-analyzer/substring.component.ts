import { CommonModule, Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { StringService } from '../../services/string.service';
import moment from 'moment';
import { debounceTime, distinctUntilChanged, of, Subject, switchMap, takeUntil } from 'rxjs';
import { AnalysisResult } from '../models/AnalysisResult';
import { LengthFilterPipe } from '../../pipes/lengthfilter.pipe';

@Component({
  selector: 'app-substring',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, ReactiveFormsModule, LengthFilterPipe],
  providers: [StringService],
  templateUrl: './substring.component.html',
  styleUrl: './substring.component.css'

})
export class SubstringComponent implements OnInit {
  form: FormGroup;
  result: AnalysisResult | null = null;
  error: string | null = null;
  history = [] as any;
  showHistory = false;
  analysisHistory: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages = 3;
  loading = false;
  showAnalysis = false;
  selectedHistoryItem: any;
  skip = 0;
  limit = 10;
  showSuggestions = false;
  suggestions: string[] = [];
  private destroy$ = new Subject<void>();
  showLoadMore = true;


  constructor(private fb: FormBuilder, private stringService: StringService, private location: Location) {
    this.form = this.fb.group({
      inputString: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9\\s\\p{P}]*$')
      ]]
    });
  }

  ngOnInit() {
    this.form.get('inputString')?.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value =>
        value ? this.stringService.getStringSuggestions(value) : of([])
      )
    ).subscribe((suggestions: any) => {

      this.suggestions = suggestions;
      this.showSuggestions = suggestions.length > 0;
    });

    this.getUserHistory();
  }

  getUserHistory() {
    this.stringService.getUserHistory(this.limit, this.skip).subscribe((res: any) => {
      this.showLoadMore = res.length === this.limit;
      this.history = this.history.concat(JSON.parse(JSON.stringify(res)));
    })
  }

  viewString(word: any) {
    this.selectedHistoryItem = word
  }

  onSubmit() {
    if (this.form.valid) {
      const input = this.form.get('inputString')!.value;
      this.error = null;
      this.stringService.getSubstringAnalysis(input).subscribe((res: any) => {
        const longestSubstring = res.uniqueSubstring.find((string:any) => string.length === res.longestSubstringLength);
        this.result = { input,  longestSubstring , longestLength: res.longestSubstringLength, uniqueSubstrings: res.uniqueSubstring, timestamp: new Date() };
        this.skip = 0;
        this.history = [];
        this.getUserHistory();

      });
    }
  }

  loadMore() {
    this.skip += this.limit;
    this.getUserHistory();
  }

  selectSuggestion(suggestion: string) {
    this.form.patchValue({ inputString: suggestion });
    this.showSuggestions = false;
  }

  getFormattedDate(date: any) {
    return moment(date).format('LLL');
  }

  copySubstring(substr: string) {
    navigator.clipboard.writeText(substr);
  }

  closeAnalysis() {
    this.showAnalysis = false;
    this.result = null;
    this.form.controls['inputString'].setValue(null)
  }


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'x') {
      event.preventDefault();
      this.closeAnalysis();
    }

    if (event.ctrlKey && event.key === 'b') {
      event.preventDefault();
      this.goBack();
    }

  }

  goBack() {
    this.location.back();
  }

}