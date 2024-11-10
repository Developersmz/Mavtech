document.addEventListener("DOMContentLoaded", () => {
    const dynamic_container = document.querySelector('.dynamic-container')
    const allButtons = document.querySelectorAll(".button")

    allButtons.forEach(button => {
        button.addEventListener("click", () => {
            const buttonID = button.id
            createContent(buttonID)
        })
    })

    function createContent(buttonID) {
        dynamic_container.innerHTML = ""
        switch (buttonID){
            case "add-company":
                dynamic_container.innerHTML = `
                    <div class="container">
                <div class="row">
                    <div class="section-title">
                        <h2>Add home content</h2>
                    </div>
                    <div class="form">
                        <form method="post" action="/admin/dashboard/add">
                            <div class="input-group">
                                <input type="hidden" name="hidden" value="homeContent">
                                <label for="hm-ttl">company name</label>
                                <input type="text" id="hm-ttl" name="homename" required>
                            </div>
                            <div class="input-group">
                                <label for="hm-txt">company text</label>
                                <textarea id="hm-txt" name="hometext" required></textarea>
                            </div>
                            <div class="input-group">
                                <button type="submit" class="button">save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
                `
                break
            case "create-company-codes":
                dynamic_container.innerHTML = `
                  <div class="container">
            <div class="row">
                <div class="section-title">
                    <h2>Add company content</h2>
                </div>
                <div class="form">

                    <form method="post" action="/admin/dashboard/add">
                        <div class="input-group">
                            <input type="hidden" name="hidden" value="compVision">
                            <label for="vs-nm">vision</label>
                            <input type="text" id="vs-nm" name="visionname" required>
                        </div>
                        <div class="input-group">
                            <label for="vs-txt">vision text</label>
                            <input type="text" id="vs-txt" name="visiontext" required>
                        </div>
                        <div class="input-group">
                            <button type="submit" class="button">Save Vision</button>
                        </div>
                    </form>

                    <form method="post" action="/admin/dashboard/add">
                        <div class="input-group">
                            <input type="hidden" name="hidden" value="compMission">
                            <label for="mss-nm">mission</label>
                            <input type="text" id="mss-nm" name="missionname" required>
                        </div>
                        <div class="input-group">
                            <label for="mss-txt">mission text</label>
                            <input type="text" id="mss-txt" name="missiontext" required>
                        </div>
                        <div class="input-group">
                            <button type="submit" class="button">Save Mission</button>
                        </div>
                    </form>

                    <form method="post" action="/admin/dashboard/add">
                        <div class="input-group">
                            <input type="hidden" name="hidden" value="compValues">
                            <label for="val-nm">values</label>
                            <input type="text" id="val-nm" name="valuename" required>
                        </div>
                        <div class="input-group">
                            <label for="val-txt">values text</label>
                            <input type="text" id="val-txt" name="valuetext" required>
                        </div>
                        <div class="input-group">
                            <button type="submit" class="button">Save Values</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
        `
                break
            case "create-about":
                dynamic_container.innerHTML = `
                <div class="container">
                    <div class="row">
                        <div class="section-title">
                            <h2>Add about content</h2>
                        </div>
                        <div class="form">
                            <form method="post" action="/admin/dashboard/add">
                                <div class="input-group">
                                    <input type="hidden" name="hidden" value="aboutContent">
                                    <label for="abt-int">create introduction</label>
                                    <input text="text" id="abt-int" name="aboutintro" required>
                                </div>
                                <div class="input-group">
                                    <label for="abt-txt">create text history</label>
                                    <textarea id="abt-txt" name="abouttext" required></textarea>
                                </div>
                                <div class="input-group">
                                    <button type="submit" class="button">save</button>
                                </div>
                                </form>
                        </div>
                    </div>
                </div>
                `
                break
            case "program-label":
                dynamic_container.innerHTML = `
                    <div class="container">
                    <div class="row">
                        <div class="section-title">
                            <h2>Add program label</h2>
                        </div>
                        <div class="form">
                            <form method="post" action="/admin/dashboard/add">
                                <div class="input-group">
                                    <input type="hidden" name="hidden" value="programLabel"></input>
                                    <label for="prog-lbl">label</label>
                                    <textarea id="prog-lbl" name="programlbl" required></textarea>
                                </div>
                                <div class="input-group">
                                    <button type="submit" class="button">save</button>
                                </div>
                                </form>
                        </div>
                    </div>
                </div>
                `
                break
            case "create-program-item":
                dynamic_container.innerHTML = `
                    <div class="container">
                    <div class="row">
                        <div class="section-title">
                            <h2>Create program</h2>
                        </div>
                        <div class="form">
                            <form method="post" action="/admin/dashboard/add">
                                <div class="input-group">
                                    <input type="hidden" name="hidden" value="programItem"></input>
                                    <label for="prog-icon">program icon</label>
                                    <input type="text" id="prog-icon" name="programicon" required>
                                </div>
                                <div class="input-group">
                                    <label for="prog-catg">program category</label>
                                    <input type="text" id="prog-catg" name="programcategory" required>
                                </div>
                                <div class="input-group">
                                    <label for="prog-nm">program name</label>
                                    <input type="text" id="prog-nm" name="programname" required>
                                </div>
                                <div class="input-group">
                                    <label for="prog-desc">program description</label>
                                    <textarea id="prog-desc" name="programdesc" required></textarea>
                                </div>
                                <div class="input-group">
                                    <label for="prog-lk">program link</label>
                                    <input type="text" id="prog-lk" name="link" required>
                                </div>
                                <div class="input-group">
                                    <button type="submit" class="button">save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                `
                break
            case "service-label":
                dynamic_container.innerHTML = `
                    <div class="container">
                      <div class="row">
                        <div class="section-title">
                            <h2>create service label</h2>
                        </div>
                        <div class="form">
                            <form method="post" action="/admin/dashboard/add">
                                <div class="input-group">
                                    <input type="hidden" name="hidden" value="serviceLabel"></input>
                                    <label for="serv-lbl">service label</label>
                                    <textarea id="serv-lbl" name="servicelbl" required></textarea>
                                </div>
                                <div class="input-group">
                                    <button type="submit" class="button">save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                `
                break
            case "create-service":
                dynamic_container.innerHTML = `
                    <div class="container">
                        <div class="row">
                            <div class="section-title">
                                <h2>Create a service</h2>
                            </div>
                            <div class="form">
                                <form method="post" action="/admin/dashboard/add">
                                    <div class="input-group">
                                        <input type="hidden" name="hidden" value="serviceItm"></input>
                                        <label for="serv-ic">service icon</label>
                                        <textarea id="serv-ic" name="serviceicon" required></textarea>
                                    </div>
                                    <div class="input-group">
                                        <label for="serv-tlt">service title</label>
                                    <input type="text" id="serv-tlt" name="servicetitle" required></input>
                                    </div>
                                    <div class="input-group">
                                        <label for="serv-obj">service objective</label>
                                        <textarea id="serv-obj" name="serviceobjective" required></textarea>
                                    </div>
                                    <div class="input-group">
                                        <label for="serv-prog">service program of</label>
                                        <input type="text" id="serv-prog" name="serviceprogram" required></input>
                                    </div>
                                    <div class="input-group">
                                        <label for="prog-link">link of program responsable</label>
                                        <input type="text" id="prog-link" name="programlink" required>
                                    </div>
                                    <div class="input-group">
                                        <button type="submit" class="button">save</button>
                                    </div>
                                    </form>
                            </div>
                        </div>
                </div>
                `
                break
            case "testi-label":
                dynamic_container.innerHTML = `
                    <div class="container">
                        <div class="row">
                            <div class="section-title">
                                <h2>create testimony label</h2>
                            </div>
                            <div class="form">
                                <form method="post" action="/admin/dashboard/add">
                                    <div class="input-group">
                                        <input type="hidden" name="hidden" value="testiLabel">
                                        <label for="test-lbl">create testimony label</label>
                                        <textarea id="test-lbl" name="testimonylbl" required></textarea>
                                    </div>
                                    <div class="input-group">
                                        <button type="submit" class="button">save</button>
                                    </div>
                                    </form>
                            </div>
                        </div>
                    </div>
                `
                break
            case "blog-label":
                dynamic_container.innerHTML = `
                    <div class="container">
                        <div class="row">
                            <div class="section-title">
                                <h2>create blog label</h2>
                            </div>
                            <div class="form">
                                <form method="post" action="/admin/dashboard/add">
                                    <div class="input-group">
                                        <input type="hidden" name="hidden" value="blogLabel"></input>
                                        <label for="blog-lbl">create blog label</label>
                                        <textarea id="blog-lbl" name="bloglbl" required></textarea>
                                    </div>
                                    <div class="input-group">
                                        <button type="submit" class="button">save</button>
                                    </div>
                                    </form>
                            </div>
                        </div>
                </div>
                `
                break
            case "create-blog-item":
                dynamic_container.innerHTML = `
                    <div class="container">
                        <div class="row">
                            <div class="section-title">
                                <h2>create blog item</h2>
                            </div>
                            <div class="form">
                                <form method="POST" action="/admin/dashboard/add/blog" enctype="multipart/form-data">
                                    <div class="input-group">
                                        <label for="bg-tlt">create blog title</label>
                                        <input type="text" id="title" name="title" required>
                                    </div>
                                    <div class="input-group">
                                        <label for="news">create blog text</label>
                                        <textarea id="news" name="news" rows="4" required></textarea>
                                    </div>
                                    <div class="input-group">
                                        <label for="image">create blog image</label>
                                        <input type="file" id="image" name="image" accept="image/*">
                                    </div>
                                    <div class="input-group">
                                        <button type="submit" class="button">save</button>
                                    </div>
                                    </form>
                            </div>
                        </div>
                    </div>
                `
                break
            case "highlight":
                dynamic_container.innerHTML = `
                    <div class="container">
                        <div class="row">
                            <div class="section-title">
                                <h2>highlight item</h2>
                            </div>
                            <div class="form">
                                <form method="POST" action="/admin/dashboard/add">
                                    <div class="input-group">
                                        <input type="hidden" name="hidden" value="highlight">
                                        <label for="title">hightlight title</label>
                                        <input type="text" id="title" name="highlight" required>
                                    </div>
                                    <div class="input-group">
                                        <label for="link">hightlight link</label>
                                        <input text="link" id="link" name="link" required>
                                    </div>
                                    <div class="input-group">
                                        <button type="submit" class="button">save</button>
                                    </div>
                                    </form>
                            </div>
                        </div>
                    </div>
                `
            default:
                console.log("Return inesperado")
        }
    }
})