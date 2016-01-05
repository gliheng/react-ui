# ReactUI

react-ui a UI library for react. It contains dozens of reusable react components,
including:

Layout modules: These are useful to split screen into multiple regions.
- HGroup
- VGroup
- Grid
- Tabs

UI modules
- Popup
- Toast
- Menu

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

```js
Popup.show({
    title: 'Modal Popup',
    content: <div>Hello!</div>,
    onBtnClick: onBtnClick,
    modal: true
});
```

- Toast

```js
Toast.show({
    content: <div>Hello!</div>,
    duration: 3000
});
```

- Menu

```js
document.oncontextmenu = function (evt) {
    evt.preventDefault();

    Menu.show(evt, {
        options: [
            'Menu Item 1',
            'Menu Item 2',
            'Menu Item 3',
            '__seperator__',
            {
                title: 'Menu Group',
                style: {'color': '#dc5e21'},
                children: [
                    'Apple',
                    'Banana',
                    'Orange',
                    '__seperator__',
                    {
                        title: 'Meat',
                        children: [
                            'Mutton', 'Beaf', 'Pock'
                        ]
                    }
                ]
            }
        ]
    }, contextMenuClick);
};
```

## More Example
Check out the examples directory

# TODO
HGroup, VGroup and Grid does not support minWidth, maxWidth
