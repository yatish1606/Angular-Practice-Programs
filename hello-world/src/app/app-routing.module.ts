import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IconComponent } from "./icon/icon.component";
import { TestComponent } from "./test/test.component";

const routes : Routes = [
        {
                path: 'path/:id',
                component: TestComponent
        },
        {
                path: 'path1',
                component: IconComponent
        },
        {
                path: 'path2',
                component: IconComponent
        },
]

@NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
})
export class AppRoutingModule {}