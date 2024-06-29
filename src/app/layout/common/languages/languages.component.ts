import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { AvailableLangs, TranslocoService } from '@ngneat/transloco';
import {
    FuseNavigationService,
    FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { languageModel } from 'app/core/models/global';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';

@Component({
    selector: 'languages',
    templateUrl: './languages.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'languages',
})
export class LanguagesComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    availableLangs: AvailableLangs;
    activeLang: string;
    flagCodes: any;
    isScreenSmall: boolean;
    languages: languageModel[] = [
        { label: 'English', key: 'en' },
        { label: 'Francais', key: 'fr' },
    ];
    /**
     * Constructor
     */
    selectedLang = () => this.languages.find((f) => f.key == this.activeLang);
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService,
        private _translocoService: TranslocoService,
        private _fuseMediaWatcherService: FuseMediaWatcherService
    ) {
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                this.isScreenSmall = !matchingAliases.includes('md');
                this._changeDetectorRef.markForCheck();
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the available languages from transloco
        this.availableLangs = this._translocoService.getAvailableLangs();
        // Subscribe to language changes
        this._translocoService.langChanges$.subscribe((activeLang) => {
            // Get the active lang
            this.activeLang = activeLang;
            // Update the navigation
            this._updateNavigation(activeLang);
        });

        // Set the country iso codes for languages for flags
        this.flagCodes = {
            en: 'en',
            tr: 'fr',
        };
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set the active lang
     *
     * @param lang
     */
    setActiveLang(lang: languageModel): void {
        // Set the active lang
        this._translocoService.setActiveLang(lang.key);
        localStorage.setItem('LAG', JSON.stringify(lang));
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the navigation
     *
     * @param lang
     * @private
     */
    private _updateNavigation(lang: string): void {
        // For the demonstration purposes, we will only update the Dashboard names
        // from the navigation but you can do a full swap and change the entire
        // navigation data.
        //
        // You can import the data from a file or request it from your backend,
        // it's up to you.

        // Get the component -> navigation data -> item
        const navComponent =
            this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
                'mainNavigation'
            );

        // Return if the navigation component does not exist
        if (!navComponent) {
            return null;
        }

        // Get the flat navigation data
        const navigation = navComponent.navigation;

        // Get the Project dashboard item and update its title
        const projectDashboardItem = this._fuseNavigationService.getItem(
            'dashboards.project',
            navigation
        );
        if (projectDashboardItem) {
            this._translocoService
                .selectTranslate('Project')
                .pipe(take(1))
                .subscribe((translation) => {
                    // Set the title
                    projectDashboardItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }

        // Get the Analytics dashboard item and update its title
        const analyticsDashboardItem = this._fuseNavigationService.getItem(
            'dashboards.analytics',
            navigation
        );
        if (analyticsDashboardItem) {
            this._translocoService
                .selectTranslate('Analytics')
                .pipe(take(1))
                .subscribe((translation) => {
                    // Set the title
                    analyticsDashboardItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
    }
}
