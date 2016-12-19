/* tslint:disable:max-line-length quotemark */

/**
 * Sample data returned from
 * GET /repos/:owner/:repo/issues
 */
export const repositoryIssuesTestData = [
  {
    url: "https://api.github.com/repos/angular/angular/issues/13550",
    repository_url: "https://api.github.com/repos/angular/angular",
    labels_url: "https://api.github.com/repos/angular/angular/issues/13550/labels{/name}",
    comments_url: "https://api.github.com/repos/angular/angular/issues/13550/comments",
    events_url: "https://api.github.com/repos/angular/angular/issues/13550/events",
    html_url: "https://github.com/angular/angular/issues/13550",
    id: 196246412,
    number: 13550,
    title: "dispatchEvent doesn't trigger ngModel changes",
    user: {
      login: "n-sviridenko",
      id: 9335422,
      avatar_url: "https://avatars.githubusercontent.com/u/9335422?v=3",
      gravatar_id: "",
      url: "https://api.github.com/users/n-sviridenko",
      html_url: "https://github.com/n-sviridenko",
      followers_url: "https://api.github.com/users/n-sviridenko/followers",
      following_url: "https://api.github.com/users/n-sviridenko/following{/other_user}",
      gists_url: "https://api.github.com/users/n-sviridenko/gists{/gist_id}",
      starred_url: "https://api.github.com/users/n-sviridenko/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/n-sviridenko/subscriptions",
      organizations_url: "https://api.github.com/users/n-sviridenko/orgs",
      repos_url: "https://api.github.com/users/n-sviridenko/repos",
      events_url: "https://api.github.com/users/n-sviridenko/events{/privacy}",
      received_events_url: "https://api.github.com/users/n-sviridenko/received_events",
      type: "User",
      site_admin: false
    },
    labels: [

    ],
    state: "open",
    locked: false,
    assignee: null,
    assignees: [

    ],
    milestone: null,
    comments: 0,
    created_at: "2016-12-17T22:28:45Z",
    updated_at: "2016-12-17T22:35:32Z",
    closed_at: null,
    body: "<!--\r\nIF YOU DON'T FILL OUT THE FOLLOWING INFORMATION WE MIGHT CLOSE YOUR ISSUE WITHOUT INVESTIGATING\r\n-->\r\n\r\n**I'm submitting a ...**  (check one with \"x\")\r\n```\r\n[x] bug report => search github for a similar issue or PR before submitting\r\n[ ] feature request\r\n[ ] support request => Please do not submit support request here, instead see https://github.com/angular/angular/blob/master/CONTRIBUTING.md#question\r\n```\r\n\r\n**Current behavior**\r\nThe `dispatchEvent` function from `@angular/platform-browser/testing/browser_util` and `EventTarget.dispatchEvent` doesn't trigger `NgModel` changes. I have following output in karma (I trimmed debug backtrace):\r\n\r\n```\r\n✖ should modify message\r\n      Chrome 55.0.2883 (Mac OS X 10.11.4)\r\n    Expected undefined to be 'The longest content.'.\r\n    ...\r\n    Expected undefined to be '4'.\r\n    ...\r\n```\r\n\r\n**Expected behavior**\r\nPass the test\r\n\r\n**Minimal reproduction of the problem with instructions**\r\nMy code:\r\n\r\nreview-form.component.ts:\r\n\r\n```typescript\r\nimport {\r\n  Input,\r\n  Output,\r\n  Component,\r\n  ViewChild,\r\n  EventEmitter,\r\n} from '@angular/core';\r\nimport { NgForm } from '@angular/forms';\r\n\r\nimport { Product } from 'app/model';\r\nimport {\r\n  AbstractForm,\r\n  FormErrorList,\r\n  ProductReviewMessage,\r\n} from 'app/core';\r\n\r\n@Component({\r\n  selector: 'l-product-show-review-form',\r\n  templateUrl: './review-form.component.html',\r\n})\r\nexport class ProductShowReviewFormComponent extends AbstractForm {\r\n  @Input()\r\n  public model: ProductReviewMessage;\r\n\r\n  @Input()\r\n  public product: Product;\r\n\r\n  @Output()\r\n  public formSubmit = new EventEmitter<any>();\r\n\r\n  @Input()\r\n  public set errors(errors: FormErrorList) {\r\n    this.applyFormErrorList(errors);\r\n  }\r\n\r\n  @ViewChild('form')\r\n  public set ngForm(ngForm: NgForm) {\r\n    this.form = ngForm.form;\r\n  }\r\n\r\n  public doFormSubmit() {\r\n    this.formSubmit.emit();\r\n  }\r\n}\r\n```\r\n\r\nreview-form.component.html:\r\n\r\n```html\r\n<form #form=\"ngForm\" (ngSubmit)=\"doFormSubmit()\">\r\n  <div [lControlWrapper]=\"content\">\r\n    <div class=\"clearfix m-b-1\">\r\n      <label class=\"form-control-static\" for=\"reviewContent\" i18n>l.product.show.reviewForm.content</label>\r\n      <div>\r\n        <textarea\r\n          class=\"form-control\"\r\n          id=\"reviewContent\"\r\n          name=\"content\"\r\n          required\r\n          [(ngModel)]=\"model.content\"\r\n          #content=\"ngModel\"\r\n        ></textarea>\r\n      </div>\r\n    </div>\r\n    <l-control-error [control]=\"content\"></l-control-error>\r\n  </div>\r\n  <div [lControlWrapper]=\"rating\">\r\n    <div class=\"clearfix m-b-1\">\r\n      <label class=\"form-control-static\" for=\"reviewRating\" i18n>l.product.show.reviewForm.rating</label>\r\n      <div>\r\n        <input\r\n          type=\"number\"\r\n          class=\"form-control l-number-input\"\r\n          id=\"reviewRating\"\r\n          name=\"rating\"\r\n          required\r\n          [(ngModel)]=\"model.rating\"\r\n          #rating=\"ngModel\"\r\n        />\r\n      </div>\r\n    </div>\r\n    <l-control-error [control]=\"rating\"></l-control-error>\r\n  </div>\r\n  <div>\r\n    <button\r\n      type=\"submit\"\r\n      class=\"btn btn-primary btn-lg btn-block\"\r\n      [disabled]=\"!form.form.valid\"\r\n      i18n\r\n    >l.product.show.reviewForm.submit</button>\r\n  </div>\r\n</form>\r\n```\r\n\r\n[other file that executes just one time in test environment]:\r\n\r\n```typescript\r\nconst { TestBed } = require('@angular/core/testing');\r\nconst { platformBrowserDynamicTesting, BrowserDynamicTestingModule } = require('@angular/platform-browser-dynamic/testing');\r\n\r\nTestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());\r\n```\r\n\r\nreview-form.component.spec.ts:\r\n\r\n```typescript\r\nimport { DebugElement } from '@angular/core';\r\nimport { By } from '@angular/platform-browser';\r\nimport { dispatchEvent } from '@angular/platform-browser/testing/browser_util';\r\nimport { ComponentFixture, TestBed, async, fakeAsync } from '@angular/core/testing';\r\n\r\nimport { Product } from 'app/model';\r\nimport { SharedModule } from 'app/shared';\r\nimport { ProductReviewMessage } from 'app/core';\r\nimport { ProductShowReviewFormComponent } from './review-form.component';\r\n\r\nfunction newEvent(eventName: string, bubbles = false, cancelable = false) {\r\n  let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'\r\n  evt.initCustomEvent(eventName, bubbles, cancelable, null);\r\n  return evt;\r\n}\r\n\r\ndescribe('ProductShowReviewFormComponent', () => {\r\n  let fixture: ComponentFixture<ProductShowReviewFormComponent>;\r\n  let comp: ProductShowReviewFormComponent;\r\n  let submitSpy: jasmine.Spy;\r\n  let contentInput: HTMLTextAreaElement;\r\n  let ratingInput: HTMLInputElement;\r\n  let form: DebugElement;\r\n  let product: Product;\r\n  let message: ProductReviewMessage;\r\n\r\n  beforeEach(async(() => {\r\n    TestBed\r\n      .configureTestingModule({\r\n        imports: [SharedModule],\r\n        declarations: [ProductShowReviewFormComponent],\r\n      })\r\n      .compileComponents()\r\n    ;\r\n  }));\r\n\r\n  beforeEach(() => {\r\n    fixture = TestBed.createComponent(ProductShowReviewFormComponent);\r\n    comp = fixture.componentInstance;\r\n    submitSpy = spyOn(comp.formSubmit, 'emit');\r\n\r\n    contentInput = fixture.debugElement.query(By.css('#reviewContent')).nativeElement;\r\n    ratingInput = fixture.debugElement.query(By.css('#reviewRating')).nativeElement;\r\n    form = fixture.debugElement.query(By.css('form'));\r\n\r\n    product = new Product();\r\n    product.id = 1;\r\n\r\n    comp.product = product;\r\n\r\n    message = new ProductReviewMessage();\r\n    message.product = product;\r\n\r\n    comp.model = message;\r\n  });\r\n\r\n  it('should modify message', fakeAsync(() => {\r\n    const expectedContent = 'The longest content.';\r\n    const expectedRating = '4';\r\n\r\n    contentInput.value = expectedContent;\r\n    dispatchEvent(contentInput, newEvent('input'));\r\n    // contentInput.dispatchEvent(newEvent('input')); // doesn't trigger too\r\n\r\n    ratingInput.value = expectedRating;\r\n    dispatchEvent(ratingInput, 'input');\r\n\r\n    fixture.detectChanges();\r\n    // tick(); // doesn't help\r\n\r\n    form.triggerEventHandler('submit', null);\r\n\r\n    expect(submitSpy.calls.any()).toBe(true);\r\n    expect(comp.model.content).toBe(expectedContent);\r\n    expect(comp.model.rating).toBe(expectedRating);\r\n  }));\r\n});\r\n```\r\n\r\n**What is the motivation / use case for changing the behavior?**\r\nI need to test a form.\r\n\r\n**Please tell us about your environment:**\r\n* OS: OSX El Capitan v. 10.11.4\r\n* Package Manager: npm 3.10.9\r\n\r\n* **Angular version:** 2.0.1\r\n\r\n* **Browser:** Chrome 55.0.2883 (Mac OS X 10.11.4)\r\n \r\n* **Language:** TypeScript ^2.0.2\r\n\r\n* **Node (for AoT issues):** `node --version` = v4.4.2\r\n"
  },
  {
    url: "https://api.github.com/repos/angular/angular/issues/13549",
    repository_url: "https://api.github.com/repos/angular/angular",
    labels_url: "https://api.github.com/repos/angular/angular/issues/13549/labels{/name}",
    comments_url: "https://api.github.com/repos/angular/angular/issues/13549/comments",
    events_url: "https://api.github.com/repos/angular/angular/issues/13549/events",
    html_url: "https://github.com/angular/angular/pull/13549",
    id: 196242142,
    number: 13549,
    title: "fix(platform-browser): run event handler inside angular zone",
    user: {
      login: "DzmitryShylovich",
      id: 9335533,
      avatar_url: "https://avatars.githubusercontent.com/u/9335533?v=3",
      gravatar_id: "",
      url: "https://api.github.com/users/DzmitryShylovich",
      html_url: "https://github.com/DzmitryShylovich",
      followers_url: "https://api.github.com/users/DzmitryShylovich/followers",
      following_url: "https://api.github.com/users/DzmitryShylovich/following{/other_user}",
      gists_url: "https://api.github.com/users/DzmitryShylovich/gists{/gist_id}",
      starred_url: "https://api.github.com/users/DzmitryShylovich/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/DzmitryShylovich/subscriptions",
      organizations_url: "https://api.github.com/users/DzmitryShylovich/orgs",
      repos_url: "https://api.github.com/users/DzmitryShylovich/repos",
      events_url: "https://api.github.com/users/DzmitryShylovich/events{/privacy}",
      received_events_url: "https://api.github.com/users/DzmitryShylovich/received_events",
      type: "User",
      site_admin: false
    },
    labels: [
      {
        id: 149476251,
        url: "https://api.github.com/repos/angular/angular/labels/cla:%20yes",
        name: "cla: yes",
        color: "009800",
        default: false
      }
    ],
    state: "open",
    locked: false,
    assignee: null,
    assignees: [

    ],
    milestone: null,
    comments: 0,
    created_at: "2016-12-17T20:50:16Z",
    updated_at: "2016-12-17T21:09:53Z",
    closed_at: null,
    pull_request: {
      url: "https://api.github.com/repos/angular/angular/pulls/13549",
      html_url: "https://github.com/angular/angular/pull/13549",
      diff_url: "https://github.com/angular/angular/pull/13549.diff",
      patch_url: "https://github.com/angular/angular/pull/13549.patch"
    },
    body: "Closes #13548"
  },
  {
    url: "https://api.github.com/repos/angular/angular/issues/13548",
    repository_url: "https://api.github.com/repos/angular/angular",
    labels_url: "https://api.github.com/repos/angular/angular/issues/13548/labels{/name}",
    comments_url: "https://api.github.com/repos/angular/angular/issues/13548/comments",
    events_url: "https://api.github.com/repos/angular/angular/issues/13548/events",
    html_url: "https://github.com/angular/angular/issues/13548",
    id: 196241202,
    number: 13548,
    title: "2.3.1 (electron) HostListener runs outside of NgZone",
    user: {
      login: "fknop",
      id: 6775689,
      avatar_url: "https://avatars.githubusercontent.com/u/6775689?v=3",
      gravatar_id: "",
      url: "https://api.github.com/users/fknop",
      html_url: "https://github.com/fknop",
      followers_url: "https://api.github.com/users/fknop/followers",
      following_url: "https://api.github.com/users/fknop/following{/other_user}",
      gists_url: "https://api.github.com/users/fknop/gists{/gist_id}",
      starred_url: "https://api.github.com/users/fknop/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/fknop/subscriptions",
      organizations_url: "https://api.github.com/users/fknop/orgs",
      repos_url: "https://api.github.com/users/fknop/repos",
      events_url: "https://api.github.com/users/fknop/events{/privacy}",
      received_events_url: "https://api.github.com/users/fknop/received_events",
      type: "User",
      site_admin: false
    },
    labels: [

    ],
    state: "open",
    locked: false,
    assignee: {
      login: "IgorMinar",
      id: 216296,
      avatar_url: "https://avatars.githubusercontent.com/u/216296?v=3",
      gravatar_id: "",
      url: "https://api.github.com/users/IgorMinar",
      html_url: "https://github.com/IgorMinar",
      followers_url: "https://api.github.com/users/IgorMinar/followers",
      following_url: "https://api.github.com/users/IgorMinar/following{/other_user}",
      gists_url: "https://api.github.com/users/IgorMinar/gists{/gist_id}",
      starred_url: "https://api.github.com/users/IgorMinar/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/IgorMinar/subscriptions",
      organizations_url: "https://api.github.com/users/IgorMinar/orgs",
      repos_url: "https://api.github.com/users/IgorMinar/repos",
      events_url: "https://api.github.com/users/IgorMinar/events{/privacy}",
      received_events_url: "https://api.github.com/users/IgorMinar/received_events",
      type: "User",
      site_admin: false
    },
    assignees: [
      {
        login: "IgorMinar",
        id: 216296,
        avatar_url: "https://avatars.githubusercontent.com/u/216296?v=3",
        gravatar_id: "",
        url: "https://api.github.com/users/IgorMinar",
        html_url: "https://github.com/IgorMinar",
        followers_url: "https://api.github.com/users/IgorMinar/followers",
        following_url: "https://api.github.com/users/IgorMinar/following{/other_user}",
        gists_url: "https://api.github.com/users/IgorMinar/gists{/gist_id}",
        starred_url: "https://api.github.com/users/IgorMinar/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/IgorMinar/subscriptions",
        organizations_url: "https://api.github.com/users/IgorMinar/orgs",
        repos_url: "https://api.github.com/users/IgorMinar/repos",
        events_url: "https://api.github.com/users/IgorMinar/events{/privacy}",
        received_events_url: "https://api.github.com/users/IgorMinar/received_events",
        type: "User",
        site_admin: false
      }
    ],
    milestone: null,
    comments: 0,
    created_at: "2016-12-17T20:30:15Z",
    updated_at: "2016-12-17T20:42:57Z",
    closed_at: null,
    body: "<!--\r\nIF YOU DON'T FILL OUT THE FOLLOWING INFORMATION WE MIGHT CLOSE YOUR ISSUE WITHOUT INVESTIGATING\r\n-->\r\n\r\n**I'm submitting a ...**  (check one with \"x\")\r\n```\r\n[x] bug report => search github for a similar issue or PR before submitting\r\n[ ] feature request\r\n[ ] support request => Please do not submit support request here, instead see https://github.com/angular/angular/blob/master/CONTRIBUTING.md#question\r\n```\r\n\r\n**Current behavior**\r\n<!-- Describe how the bug manifests. -->\r\n\r\nHostListener runs outside of NgZone and does not trigger change detection.\r\nI have a piece of code that worked fine in `2.1.0` that broke when I updated to `2.3.1`.\r\n\r\nAfter some tests in multiple components, not a single HostListener runs in the NgZone.\r\n\r\n**Expected behavior**\r\n<!-- Describe what the behavior would be without the bug. -->\r\n\r\nHostListener always runs inside of NgZone.\r\n\r\n**Minimal reproduction of the problem with instructions**\r\n<!--\r\nIf the current behavior is a bug or you can illustrate your feature request better with an example, \r\nplease provide the *STEPS TO REPRODUCE* and if possible a *MINIMAL DEMO* of the problem via\r\nhttps://plnkr.co or similar (you can use this template as a starting point: http://plnkr.co/edit/tpl:AvJOMERrnz94ekVua0u5).\r\n-->\r\n\r\nI could not reproduce the problem in a plunkr with `2.3.1` version. I think it may be related to Electron.\r\n\r\nBy looking at the commits between 2.1.0 and 2.3.1, I tried reverting the changes locally in the angular bundle from this commit https://github.com/angular/angular/commit/648ce59#diff-cfd9df831a0a999da4cd9bf53c8cd719L21 and it's working as expected.\r\n\r\n**What is the motivation / use case for changing the behavior?**\r\n<!-- Describe the motivation or the concrete use case -->\r\n\r\n**Please tell us about your environment:**\r\n<!-- Operating system, IDE, package manager, HTTP server, ... -->\r\n* Windows 10\r\n\r\n* **Angular version:** 2.3.1\r\n\r\n* **Browser:** Electron app on Windows 10\r\n* **Language:** Typescript\r\n\r\n* **Node (for AoT issues):** `node --version` =   \r\n"
  }
];
