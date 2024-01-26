import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from 'app/components/header/header.component';
import { AuthInterceptor } from 'app/shared/interceptors/auth-interceptor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { FavoriteButtonComponent } from './components/favorite-button/favorite-button.component';
import { FilterComponent } from './components/filter/filter.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';
import { MaterialModule } from './material/material.module';
import { CartItemComponent } from './pages/cart/cart-item/cart-item.component';
import { CartListComponent } from './pages/cart/cart-list/cart-list.component';
import { CartModalComponent } from './pages/cart/cart-modal/cart-modal.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { MainComponent } from './pages/main/main.component';
import { ProductItemComponent } from './pages/main/product-item/product-item.component';
import { ProductItemDetailsComponent } from './pages/main/product-item-details/product-item-details.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { JsonPlaceholderResolver } from './shared/services/json-placeholder.resolver';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProductItemComponent,
    FilterComponent,
    SearchComponent,
    NavbarComponent,
    FavoritesComponent,
    ProfileComponent,
    FavoriteButtonComponent,
    ProductItemDetailsComponent,
    ConfirmationDialogComponent,
    CartListComponent,
    CartItemComponent,
    CartModalComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [
    BrowserModule,
    JsonPlaceholderResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
