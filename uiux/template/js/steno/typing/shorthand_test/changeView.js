let option = 0;
let content = '';

let html_1 = `<textarea class="form-control z-depth-1 txtEditor" id="guestComment" rows="10"
                            onkeydown="checkArrows(event.keyCode, this)"></textarea>    
                            <div class="row">
                                <button class="btn btn-block btn-success mt-3" onclick="fnOnSave()"><i
                                        class="fa fa-floppy-o" aria-hidden="true"></i>Gửi nhận xét
                                </button>
                            </div>
                <script src="../../template/js/steno/typing/autocomplete/autocompleteTextarea.js"></script>`;


$(document).ready(function () {
    let stenoUpperBank = $(".stenoUpperBank");
    stenoUpperBank.empty();
    let stenoLowerBank = $(".stenoLowerBank");
    stenoLowerBank.empty();
    let stenoVowelKeys = $(".stenoVowelKeys");
    stenoVowelKeys.empty();
    let stdKeyboard = "#stdKeyboard";
    for (let j = 0; j < listKey.length; j++) {
        let textStd = `<span class="upper">` + listKey[j].valueSteno.replace('-', '') + `</span><span class="lower-left" style="color: #6b6b47">` + listKey[j].valueQwerty.toUpperCase() + `</span>`
        $(stdKeyboard).find(".code" + listKey[j].keyQwerty).empty()
        $(stdKeyboard).find(".code" + listKey[j].keyQwerty).append(textStd)
        if (listKey[j].idLayout < 10) {
            let text = `<div class="stenoKey square code` + listKey[j].keyQwerty + `" id="stenoKey-` + listKey[j].idLayout + `"
                            data-priority="` + listKey[j].priority + `" data-keyQwerty="` + listKey[j].keyQwerty + `"
                            data-valueQwerty="` + listKey[j].valueQwerty + `" style="background-color: rgb(0, 0, 0);">` + listKey[j].valueSteno.replace('-', '') + `</div>`;
            stenoUpperBank.append(text)
        } else if (listKey[j].idLayout < 20) {
            let text = `<div class="stenoKey rounded code` + listKey[j].keyQwerty + `" id="stenoKey-` + listKey[j].idLayout + `"
                            data-priority="` + listKey[j].priority + `" data-keyQwerty="` + listKey[j].keyQwerty + `"
                            data-valueQwerty="` + listKey[j].valueQwerty + `" style="background-color: rgb(0, 0, 0);">` + listKey[j].valueSteno.replace('-', '') + `</div>`;
            stenoLowerBank.append(text)
        } else {
            let text = `<div class="stenoKey rounded code` + listKey[j].keyQwerty + `" id="stenoKey-` + listKey[j].idLayout + `"
                            data-priority="` + listKey[j].priority + `" data-keyQwerty="` + listKey[j].keyQwerty + `"
                            data-valueQwerty="` + listKey[j].valueQwerty + `" style="background-color: rgb(0, 0, 0);">` + listKey[j].valueSteno.replace('-', '') + `</div>`;
            stenoVowelKeys.append(text)
        }
    }

    $("#button-generate-example").on('click', function () {

        let keys = Object.keys(jsonExample)
        let key = keys[Math.floor(Math.random() * keys.length)];
        let randomValues = jsonExample[key]
        $(".vietnameseDocument").empty()
        $(".vietnameseDocument").html(key)
        $(".stenoDocument").empty()
        $(".stenoDocument").html(randomValues)
    })
})

function fnOnDone() {
    let name_typing = $("#name-typing");
    $("#data-typing").val($("#output").val())
    name_typing.text(" Nhận xét về bộ gõ");
    let parent = $(".parent");
    parent.empty();
    parent.html(html_1);
    $(".vietnameseDocument").empty()
    $(".stenoDocument").empty()
    $(".btn-generate").css('display', 'none')
}

function fnOnSave() {
    let data_typing = $("#data-typing").val();
    let data_comment = $("#guestComment").val();
    $.ajax({
        url: "/test-typing-shorthand.html",
        type: "POST",
        data: {
            type: 'saveFile',
            data_typing: data_typing,
            data_comment: data_comment
        },
        success: function () {
            swal({
                    title: "Thông báo",
                    text: "Cảm ơn phản hồi của bạn!!",
                    type: "success",
                },
                function () {
                    swal.close();
                    location.reload(true);
                });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}