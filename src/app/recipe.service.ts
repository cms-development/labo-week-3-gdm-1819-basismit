import { MessageService } from './message.service';
import { RECIPES } from './mock-recipes';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipesUrl = 'http://labo1.local/wp-json/wp/v2/recipes';  // URL to web api

  /** Log a HeroService message with the MessageService */
private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
}

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }
  getRecipes(): Observable<Recipe[]> {
    // this.messageService.add('RecipeService: fetched recipes');
    // return of(RECIPES);
      return this.http.get<Recipe[]>(this.recipesUrl).pipe(
        tap(recipes => this.log('fetched recipes')),
        catchError(this.handleError('getRecipes', []))
      );
  }
  getRecipe(id: number): Observable<Recipe> {
    const url = `${this.recipesUrl}/${id}?_embed`;
    return this.http.get<Recipe>(url).pipe(
      tap(_ => this.log(`fetched recipe id=${id}`)),
      catchError(this.handleError<Recipe>(`getRecipe id=${id}`))
    );
    // this.messageService.add(`RecipeService fetched recipe id=${id}`);
    // return of(RECIPES.find(recipe => recipe.id === id));
  }




  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
