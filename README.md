# ReactUI

react-ui a UI library for react. It contains dozens of reusable react components.


## Features
- The layout package is done.
- It includes containers modules (HGroup VGroup and Grid), to easily split screen into multiple panels
- These containers include gutter to resize panels.
- API to save and restore layout configuration automaticly.


## Basic Usage

- HGroup, VGroup

    ```js
    React.render(
        <HGroup>
            <VGroup>
                <View>left top</View>
                <View>left bottom</View>
            </VGroup>
            <VGroup>
                <View>right top</View>
                <View>right bottom</View>
            </VGroup>
        </HGroup>,
        document.getElementById('app')
    )
    ```

- Grid

    ```js
    React.render(
        <Grid rows="3" cols="3">
            <View row="1" col="1"></View>
            <View row="1" col="2"></View>
            <View row="2" col="1"></View>
            <View row="2" col="2"></View>
        </Grid>,
        document.getElementById('app')
    )
    ```

- Tabs

```js
React.render(
    <Tabs>
        <div label="tab 1">A</div>
        <div label="tab 2">B</div>
        <div label="tab 3">C</div>
    </Tabs>,
    document.getElementById('app')
)
```

- Popup


### TODO ###

var frontpage = Layout.createLayout();
frontpage.show();

layout.saveLayout()
layout.restoreLayout()


<Area>
    <View></View>
    <View></View>
    <View></View>
    <View></View>
    <View></View>
</Area>

## More Example
Check out the examples directory

# TODO
minWidth maxWidth for HGroup and Grid
when comp is resized, persistent state does not work well
